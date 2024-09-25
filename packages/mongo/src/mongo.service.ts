import { AbstractClientService, Clazz, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import { getModelForClass, getModelWithString } from '@typegoose/typegoose';
import mongoose, { ClientSession, ClientSessionOptions, Connection as Mongoose } from 'mongoose';
import { QueryHelper } from './helpers';
import { MongoSchema } from './models';
import { MongoClient, MongoModelRegistry, MongoType } from './mongo.client';
import { MongoConfig } from './mongo.config';
import { MODEL_REGISTRY_KEY } from './mongo.constant';

const RETRY_OPTS = 'mongo.retry';

@Injectable()
export class MongoService extends AbstractClientService<MongoConfig, Mongoose> implements MongoClient {
  constructor(@Inject(MODEL_REGISTRY_KEY) private modelRegistry: MongoModelRegistry) {
    super('mongo', MongoConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MongoConfig): Promise<Mongoose> {
    let uri = this.buildUri(config);
    if (config.params) uri += `?${config.params}`;
    const connectOptions: mongoose.ConnectOptions = {
      user: config.username,
      pass: config.password,
      dbName: config.database,
    };

    mongoose.set('strictQuery', config.strictQuery);
    mongoose.set('autoIndex', config.autoIndex);
    if (config.debug) {
      mongoose.set('debug', (collectionName: string, methodName: string, ...methodArgs: any[]) => {
        const args = methodArgs.map(arg => JSON.stringify(arg)).join(', ');
        this.logService.info(`Mongoose: db.getCollection("%s").%s(%s)`, collectionName, methodName, args);
      });
    }

    const client = mongoose.createConnection(uri, connectOptions);
    this.logService.info('`%s` Connection to MongoDB established', config.conId, uri);

    client.on('open', () => this.start(client, config.conId));
    client.on('error', async err => {
      this.logService.error(err, '`%s` Error when connecting to MongoDB. Reconnecting...', config.conId);
      await this.clientInit(config, false);
    });
    client.on('disconnected', async () => {
      this.logService.error('`%s` MongoDB connection disconnected. Reconnecting...', config.conId);
      await this.clientInit(config, false);
    });

    return client;
  }

  private buildUri(config: MongoConfig): string {
    if (config.uri) return config.uri;
    if (config.replica) return `mongodb+srv://${config.host}/${config.database}`;
    return `mongodb://${config.host}:${config.port}/${config.database}`;
  }

  async start(client: Mongoose, conId: string = DEFAULT_CON_ID): Promise<void> {
    if (client.readyState !== 1) return;

    const version = await this.getVersion(conId);
    this.logService.info('`%s` Connected to MongoDB (%s) successfully', conId, version);
    const numericVersion = version.split('.').map((v: string) => parseInt(v));
    if (numericVersion[0] < 5) {
      this.logService.warn(
        `Warning: MongoDB version %s is less than 5.0. Some features may not work correctly. Please consider upgrading MongoDB to version 5.0 or higher`,
        version,
      );
    }

    if (this.modelRegistry[conId]) {
      for (const schemaClass of Object.values(this.modelRegistry[conId])) {
        await this.registerModel(schemaClass, conId);
      }
      this.logService.info('`%s` Register models for Mongoose successfully', conId);
    }
  }

  public async getVersion(conId: string = DEFAULT_CON_ID): Promise<string> {
    const serverInfo = await this.getClient(conId).db.admin().serverInfo();
    return serverInfo.version;
  }

  public async registerModel(schemaClass: typeof MongoSchema, conId: string = DEFAULT_CON_ID) {
    const config = this.getConfig(conId);
    const opts = { existingConnection: this.getClient(conId) };

    const model = getModelForClass<typeof MongoSchema, QueryHelper<any>>(schemaClass, opts);
    if (config.debug) this.logService.info('`%s` Schema `%s` registered', conId, schemaClass.name);

    if (config.autoIndex) {
      const diffIndexes = await model.diffIndexes();
      if (diffIndexes.toCreate.length || diffIndexes.toDrop.length) {
        await model.syncIndexes({ continueOnError: true });
        if (config.debug) this.logService.info('`%s` Schema `%s` sync indexes', conId, model.modelName);
      }
    }
  }

  async stop(client: Mongoose, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.close(true);
    this.logService.error('`%s` MongoDB connection has been terminated', conId);
  }

  public isConnected(conId: string = DEFAULT_CON_ID): boolean {
    if (!this.getClient(conId)) return false;
    return this.getClient(conId).readyState === 1;
  }

  public async startTransaction(
    options: ClientSessionOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<ClientSession> {
    const session = await this.getClient(conId).startSession(options);
    session.startTransaction();
    return session;
  }

  public getModel<T extends MongoSchema>(schemaClass: Clazz): MongoType<T> {
    return getModelWithString(schemaClass.name);
  }
}
