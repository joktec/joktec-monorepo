import { AbstractClientService, Injectable, DEFAULT_CON_ID, Retry } from '@joktec/core';
import mongoose, { Connection as Mongoose } from 'mongoose';
import { MongoConfig } from './mongo.config';
import { MongoClient } from './mongo.client';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { getModelForClass, Severity } from '@typegoose/typegoose';

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
    };

    this.logService.info('Start connecting to mongo database %s', uri);
    const connection: Mongoose = mongoose.createConnection(uri, connectOptions);
    connection.set('strictQuery', config.strictQuery);
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
    return `${protocol}://${config.host}:${config.port}/?authSource=${config.database || 'admin'}`;
  }

  async start(client: Mongoose, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: Mongoose, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.close(true);
  }

  public getModel(schemaClass: AnyParamConstructor<any>, conId: string = DEFAULT_CON_ID) {
    return getModelForClass(schemaClass, {
      existingConnection: this.getClient(conId),
      schemaOptions: {
        versionKey: true,
        strict: true,
        strictQuery: true,
        id: true,
        minimize: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
      },
      options: {
        allowMixed: Severity.ALLOW,
      },
    });
  }
}
