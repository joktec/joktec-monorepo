import { AbstractClientService, Constructor, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import mongoose, { Connection as Mongoose } from 'mongoose';
import { MongoConfig } from './mongo.config';
import { MongoClient } from './mongo.client';
import { ModelType } from '@typegoose/typegoose/lib/types';
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
      autoCreate: config.autoCreate,
    };

    mongoose.set('strictQuery', config.strictQuery);
    mongoose.set('debug', (collectionName: string, methodName: string, ...methodArgs: any[]) => {
      const args = methodArgs.map(arg => JSON.stringify(arg)).join(', ');
      this.logService.debug(`Mongoose: %s.%s(%s)`, collectionName, methodName, args);
    });

    this.logService.info('Start connecting to mongo database %s', uri);
    const client = await mongoose.connect(uri, connectOptions);

    this.logService.info('Connected to mongo database successfully');
    client.connection.on('error', async err => {
      this.logService.error(err, 'Error when connecting to MongoDB. Reconnecting...');
      await this.clientInit(config, false);
    });
    client.connection.on('disconnected', async () => {
      this.logService.error('MongoDB connection disconnected. Reconnecting...');
      await this.clientInit(config, false);
    });
    return client.connection;
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
    this.logService.trace('Schema `%s` registered', schemaClass.name);
    return model;
  }
}
