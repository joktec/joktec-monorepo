import { IBaseRepository, Client, DeepPartial, ICondition } from '@joktec/core';
import { ReturnModelType } from '@typegoose/typegoose';
import { ClientSession, ClientSessionOptions, Connection, UpdateQuery } from 'mongoose';
import { IMongoAggregation, MongoBulkRequest, MongoSchema, QueryHelper } from './models';
import { MongoConfig } from './mongo.config';

export interface MongoClient extends Client<MongoConfig, Connection> {
  isConnected(conId?: string): boolean;

  getModel<T extends MongoSchema>(
    schemaClass: typeof MongoSchema,
    conId?: string,
  ): ReturnModelType<typeof MongoSchema, QueryHelper<T>>;

  startTransaction(options?: ClientSessionOptions, conId?: string): Promise<ClientSession>;
}

export interface IMongoRepository<T extends MongoSchema, ID = string> extends IBaseRepository<T, ID> {
  update(condition: ICondition<T>, body: DeepPartial<T> & UpdateQuery<T>): Promise<T>;

  aggregate<U = T>(aggregations: IMongoAggregation[]): Promise<U[]>;

  upsert(condition: ICondition<T>, body: DeepPartial<T>): Promise<T>;

  bulkUpsert(docs: DeepPartial<T>[], upsert?: MongoBulkRequest): Promise<any>;

  deleteMany(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T[]>;
}
