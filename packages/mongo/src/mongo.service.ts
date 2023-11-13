import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import mongoose, { ClientSession, ClientSessionOptions, Connection as Mongoose } from 'mongoose';
import { MongoSchema, QueryHelper } from './models';
import { MongoClient } from './mongo.client';
import { MongoConfig } from './mongo.config';

const RETRY_OPTS = 'mongo.retry';

@Injectable()
export class MongoService extends AbstractClientService<MongoConfig, Mongoose> implements MongoClient {
  constructor() {
    super('mongo', MongoConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MongoConfig): Promise<Mongoose> {
    const uri = this.buildUri(config);
    const connectOptions: mongoose.ConnectOptions = {
      user: config.username,
      pass: config.password,
      directConnection: config.directConnection,
      connectTimeoutMS: config.connectTimeout,
      autoCreate: config.autoCreate,
    };

    mongoose.set('strictQuery', config.strictQuery);
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
    if (config.url) return config.url;
    const protocol = config.replica ? 'mongodb+srv' : 'mongodb';
    return `${protocol}://${config.host}:${config.port}/${config.database}?authSource=${config.database}`;
  }

  async start(client: Mongoose, conId: string = DEFAULT_CON_ID): Promise<void> {
    if (!this.isConnected(conId)) return;

    const serverInfo = await client.db.admin().serverInfo();
    const version = serverInfo.version;
    this.logService.info('`%s` Connected to MongoDB (%s) successfully', conId, version);

    const numericVersion = version.split('.').map(v => parseInt(v));
    if (numericVersion[0] < 5) {
      this.logService.warn(
        `Warning: MongoDB version %s is less than 5.0. Some features may not work correctly. Please consider upgrading MongoDB to version 5.0 or higher`,
        version,
      );
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

  public getModel<T extends MongoSchema>(
    schemaClass: typeof MongoSchema,
    conId: string = DEFAULT_CON_ID,
  ): ReturnModelType<typeof MongoSchema, QueryHelper<T>> {
    if (!this.isConnected(conId)) return null;
    const model = getModelForClass<typeof MongoSchema, QueryHelper<T>>(schemaClass, {
      existingConnection: this.getClient(conId),
    });

    const config = this.getConfig(conId);
    if (config.debug) {
      this.logService.info('`%s` Schema `%s` registered', conId, schemaClass.name);
    }

    return model;
  }
}
