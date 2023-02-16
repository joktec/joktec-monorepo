import { BaseRepository, Client, ICondition } from '@baotg/core';
import { MongoConfig } from './mongo.config';
import { Connection } from 'mongoose';
import { IMongoAggregation } from './models';

export interface MongoClient extends Client<MongoConfig, Connection> {}

export interface MongoRepository<T, ID> extends BaseRepository<T, ID> {
  aggregate(aggregations: IMongoAggregation[]): Promise<T[]>;

  upsert(condition: ICondition, body: T): Promise<T>;
}
