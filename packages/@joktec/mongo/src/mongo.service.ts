import { AbstractClientService, Injectable, DEFAULT_CON_ID, Retry } from '@joktec/core';
import mongoose, { Connection as Mongoose } from 'mongoose';
import { MongoConfig } from './mongo.config';
import { MongoClient } from './mongo.client';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { getModelForClass, Severity } from '@typegoose/typegoose';
import { MongoConnectException, MongoDisconnectedException } from './exceptions';

const RETRY_OPTS = 'mongo.retry';

@Injectable()
export class MongoService extends AbstractClientService<MongoConfig, Mongoose> implements MongoClient {
  constructor() {
    super('mongo', MongoConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: MongoConfig): Promise<Mongoose> {
    await this.connect(config);
    mongoose.connection.on('connected', () => this.logService.info('Connected to mongo database successfully'));
    mongoose.connection.on('error', err => {
      throw new MongoConnectException('Error when connecting to database', err);
    });
    mongoose.connection.on('disconnected', () => {
      throw new MongoDisconnectedException('Database connection disconnected');
    });
    return mongoose.connection;
  }

  @Retry(RETRY_OPTS)
  private async connect(config: MongoConfig): Promise<any> {
    const uri = this.buildUri(config);
    const connectOptions: mongoose.ConnectOptions = {
      user: config.username,
      pass: config.password,
      directConnection: config.directConnection,
      connectTimeoutMS: config.connectTimeout,
    };

    this.logService.info('Start connecting to mongo database %s', uri);
    mongoose.set('strictQuery', config.strictQuery);
    return mongoose.connect(uri, connectOptions);
  }

  private buildUri(config: MongoConfig): string {
    if (config.url) return config.url;
    const protocol = config.replica ? 'mongodb+srv' : 'mongodb';
    return `${protocol}://${config.host}:${config.port}/${config.database}?authSource=admin`;
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
      options: {
        allowMixed: Severity.ALLOW,
      },
    });
  }

  public useSoftDelete(schemaClass: AnyParamConstructor<any>, conId: string = DEFAULT_CON_ID): boolean {
    const model = this.getModel(schemaClass, conId);
    return !!model.schema.paths[''];
  }
}
