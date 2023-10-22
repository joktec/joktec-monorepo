import { BaseRepository, Client, DeepPartial, ICondition } from '@joktec/core';
import { Connection } from 'mongoose';
import { IMongoAggregation, MongoBulkRequest, MongoSchema } from './models';
import { MongoConfig } from './mongo.config';

export interface MongoClient extends Client<MongoConfig, Connection> {}

export interface IMongoRepository<T extends MongoSchema, ID = string> extends BaseRepository<T, ID> {
  aggregate<U = T>(aggregations: IMongoAggregation[]): Promise<U[]>;

  upsert(condition: ICondition<T>, body: DeepPartial<T>): Promise<T>;

  bulkUpsert(docs: DeepPartial<T>[], upsert?: MongoBulkRequest): Promise<any>;

  deleteMany(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T[]>;
}
