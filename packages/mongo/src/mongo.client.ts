import { Client, DeepPartial, IBaseRepository, ICondition } from '@joktec/core';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { ClientSession, ClientSessionOptions, Connection, RefType, UpdateQuery } from 'mongoose';
import { QueryHelper } from './helpers';
import {
  IMongoAggregateOptions,
  IMongoBulkOptions,
  IMongoOptions,
  IMongoPaginationResponse,
  IMongoPipeline,
  IMongoRequest,
  MongoSchema,
  ObjectId,
} from './models';
import { MongoConfig } from './mongo.config';

export interface MongoModuleOptions {
  models?: (typeof MongoSchema)[];
  conId?: string;
}

export interface MongoModelRegistry {
  [conId: string]: (typeof MongoSchema)[];
}

export type MongoType<T extends MongoSchema = MongoSchema> = ReturnModelType<typeof MongoSchema, QueryHelper<T>>;

export interface MongoClient extends Client<MongoConfig, Connection> {
  isConnected(conId?: string): boolean;

  getModel<T extends MongoSchema>(schemaClass: typeof MongoSchema): MongoType<T>;

  startTransaction(options?: ClientSessionOptions, conId?: string): Promise<ClientSession>;
}

export interface IMongoRepository<T extends MongoSchema, ID extends RefType = string> extends IBaseRepository<T, ID> {
  paginate(query: IMongoRequest<T>, opts?: IMongoOptions<T>): Promise<IMongoPaginationResponse<T>>;

  find(query: IMongoRequest<T>, opts?: IMongoOptions<T>): Promise<T[]>;

  count(query: IMongoRequest<T>, opts?: IMongoOptions<T>): Promise<number>;

  findOne(
    cond: ID | ObjectId | Ref<T, ID> | ICondition<T>,
    query?: Omit<IMongoRequest<T>, 'condition'>,
    opts?: IMongoOptions<T>,
  ): Promise<T>;

  create(body: DeepPartial<T>, opts?: IMongoOptions<T>): Promise<T>;

  update(
    cond: ID | ObjectId | Ref<T, ID> | ICondition<T>,
    body: DeepPartial<T> & UpdateQuery<T>,
    opts?: IMongoOptions<T>,
  ): Promise<T>;

  delete(cond: ID | ObjectId | Ref<T, ID> | ICondition<T>, opts?: IMongoOptions<T>): Promise<T>;

  deleteMany(cond: ICondition<T>, opts?: IMongoOptions<T>): Promise<T[]>;

  restore(cond: ID | ObjectId | Ref<T, ID> | ICondition<T>, opts?: IMongoOptions<T>): Promise<T>;

  upsert(doc: DeepPartial<T>, onConflicts?: (keyof T)[], opts?: IMongoOptions<T>): Promise<T>;

  bulkUpsert(docs: Array<DeepPartial<T>>, onConflicts?: (keyof T)[], opts?: IMongoBulkOptions): Promise<any>;

  aggregate<U = T>(pipeline: IMongoPipeline[], opts?: IMongoAggregateOptions<U>): Promise<U[]>;
}
