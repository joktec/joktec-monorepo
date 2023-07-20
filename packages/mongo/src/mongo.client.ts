import { BaseRepository, Client, ICondition } from '@joktec/core';
import { Connection } from 'mongoose';
import { IMongoAggregation, MongoSchema } from './models';
import { MongoConfig } from './mongo.config';

export interface MongoClient extends Client<MongoConfig, Connection> {}

export interface IMongoRepository<T extends MongoSchema, ID = string> extends BaseRepository<T, ID> {
  aggregate<U = T>(aggregations: IMongoAggregation[]): Promise<U[]>;

  upsert(condition: ICondition<T>, body: Partial<T>): Promise<T>;

  deleteMany(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T[]>;
}
