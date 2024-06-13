import { Client, DeepPartial, IBaseRepository, IBaseRequest, ICondition } from '@joktec/core';
import { ReturnModelType } from '@typegoose/typegoose';
import { ClientSession, ClientSessionOptions, Connection, UpdateQuery } from 'mongoose';
import { QueryHelper } from './helpers';
import { IMongoAggregateOptions, IMongoBulkOptions, IMongoBulkRequest, IMongoOptions, MongoSchema } from './models';
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
  paginate(
    query: IBaseRequest<T>,
    opts?: IMongoOptions<T>,
  ): Promise<{ items: T[]; total: number; prevCursor?: string; currentCursor?: string; nextCursor?: string }>;

  find(query: IBaseRequest<T>, opts?: IMongoOptions<T>): Promise<T[]>;

  count(query: IBaseRequest<T>, opts?: IMongoOptions<T>): Promise<number>;

  findOne(query: IBaseRequest<T>, opts?: IMongoOptions<T>): Promise<T>;

  findById(id: ID, query?: IBaseRequest<T>, opts?: IMongoOptions<T>): Promise<T>;

  create(body: DeepPartial<T>, opts?: IMongoOptions<T>): Promise<T>;

  update(condition: ICondition<T>, body: DeepPartial<T> & UpdateQuery<T>, opts?: IMongoOptions<T>): Promise<T>;

  delete(condition: ICondition<T>, opts?: IMongoOptions<T>): Promise<T>;

  restore(condition: ICondition<T>, opts?: IMongoOptions<T>): Promise<T>;

  aggregate<U = T>(query: IBaseRequest<T>, opts?: IMongoAggregateOptions): Promise<U[]>;

  upsert(condition: ICondition<T>, body: DeepPartial<T>, opts?: IMongoOptions<T>): Promise<T>;

  deleteMany(condition: ICondition<T>, opts?: IMongoOptions<T>): Promise<T[]>;

  bulkUpsert(docs: DeepPartial<T>[], upsert?: IMongoBulkRequest, opts?: IMongoBulkOptions): Promise<any>;
}
