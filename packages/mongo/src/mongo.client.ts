import { Client, DeepPartial, IBaseRepository, ICondition, ILanguage } from '@joktec/core';
import { ReturnModelType } from '@typegoose/typegoose';
import { ClientSession, ClientSessionOptions, Connection, UpdateQuery } from 'mongoose';
import { QueryHelper } from './helpers';
import { IMongoAggregation, MongoBulkRequest, MongoSchema } from './models';
import { MongoConfig } from './mongo.config';

export interface MongoClient extends Client<MongoConfig, Connection> {
  isConnected(conId?: string): boolean;

  getModel<T extends MongoSchema>(
    schemaClass: typeof MongoSchema,
    conId?: string,
  ): ReturnModelType<typeof MongoSchema, QueryHelper<T>>;

  syncModel(model: ReturnModelType<any>, conId?: string): Promise<void>;

  startTransaction(options?: ClientSessionOptions, conId?: string): Promise<ClientSession>;
}

export interface IMongoRepository<T extends MongoSchema, ID = string> extends IBaseRepository<T, ID> {
  update(condition: ICondition<T>, body: DeepPartial<T> & UpdateQuery<T>, opts?: { language?: ILanguage }): Promise<T>;

  aggregate<U = T>(aggregations: IMongoAggregation[], opts?: { language?: ILanguage }): Promise<U[]>;

  upsert(condition: ICondition<T>, body: DeepPartial<T>, opts?: { language?: ILanguage }): Promise<T>;

  bulkUpsert(docs: DeepPartial<T>[], upsert?: MongoBulkRequest): Promise<any>;

  deleteMany(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T[]>;
}
