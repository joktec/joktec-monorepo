import { AbstractClientService, Injectable, DEFAULT_CON_ID, Retry } from '@joktec/core';
import mongoose, { Connection as Mongoose } from 'mongoose';
import { MongoConfig } from './mongo.config';
import { MongoClient } from './mongo.client';
import { AnyParamConstructor, ModelType } from '@typegoose/typegoose/lib/types';
import { getModelForClass, setGlobalOptions, Severity } from '@typegoose/typegoose';

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
    };

    this.logService.info('Start connecting to mongo database %s', uri);
    const connection: Mongoose = mongoose.createConnection(uri, connectOptions);
    connection.set('strictQuery', config.strictQuery);
    connection.set('maxTimeMS', conffig.maxTimeMS);
    connection.on('connected', () => this.logService.info('Connected to mongo database successfully'));
    connection.on('error', async err => {
      this.logService.error(err, 'Error when connecting to MongoDB. Reconnecting...');
      await this.clientInit(config, false);
    });
    connection.on('disconnected', async () => {
      this.logService.error('MongoDB connection disconnected. Reconnecting...');
      await this.clientInit(config, false);
    });
    return connection;
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

  public getModel<T>(schemaClass: AnyParamConstructor<any>, conId: string = DEFAULT_CON_ID): ModelType<T> {
    return getModelForClass(schemaClass, { existingConnection: this.getClient(conId) });
  }
}
