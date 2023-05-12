import { BaseRepository, Client, ICondition } from '@joktec/core';
import { OrmConfig } from './orm.config';
import { Connection } from 'mongoose';
import { IMongoAggregation } from './models';

export interface MongoClient extends Client<OrmConfig, Connection> {}

export interface IMongoRepository<T extends object, ID = string> extends BaseRepository<T, ID> {
  aggregate(aggregations: IMongoAggregation[]): Promise<T[]>;

  upsert(condition: ICondition<T>, body: Partial<T>): Promise<T>;

  deleteMany(condition: ICondition<T>, opts?: { force?: boolean; userId?: ID }): Promise<T[]>;
}
