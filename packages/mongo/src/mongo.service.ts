import { AbstractClientService, Constructor, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { getModelForClass, setGlobalOptions, Severity } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import mongoose, { Connection as Mongoose } from 'mongoose';
import { MongoClient } from './mongo.client';
import { MongoConfig } from './mongo.config';

const RETRY_OPTS = 'mongo.retry';

@Injectable()
export class MongoService extends AbstractClientService<MongoConfig, Mongoose> implements MongoClient {
  constructor() {
    super('mongo', MongoConfig);
  }

  async onModuleInit(): Promise<void> {
    setGlobalOptions({
      options: { allowMixed: Severity.ALLOW },
      schemaOptions: {
        strict: true,
        strictQuery: true,
        id: true,
        minimize: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
      },
    });
    await super.onModuleInit();
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
    mongoose.set('debug', (collectionName: string, methodName: string, ...methodArgs: any[]) => {
      const args = methodArgs.map(arg => JSON.stringify(arg)).join(', ');
      this.logService.debug(`Mongoose: %s.%s(%s)`, collectionName, methodName, args);
    });

    this.logService.info('Start connecting to mongo database %s', uri);
    const client = mongoose.createConnection(uri, connectOptions);
    this.logService.info('`%s` Connection to MongoDB established', config.conId);

    client.on('open', () => this.logService.info('`%s` Connected to mongo database successfully', config.conId));
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
    // Do nothing
  }

  async stop(client: Mongoose, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.close(true);
  }

  public getModel<T>(schemaClass: Constructor<T>, conId: string = DEFAULT_CON_ID): ModelType<T> {
    const model = getModelForClass(schemaClass, { existingConnection: this.getClient(conId) });
    this.logService.debug('Schema `%s` registered', schemaClass.name);
    return model;
  }
}
