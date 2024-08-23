import { BulkWriteOptions } from 'mongodb';
import { AggregateOptions, MongooseBulkWriteOptions, QueryOptions } from 'mongoose';

export interface IMongoOptions<T = any> extends QueryOptions<T> {
  paranoid?: boolean;
  force?: boolean;
}

export interface IMongoAggregateOptions extends AggregateOptions {}

export interface IMongoBulkOptions extends BulkWriteOptions, MongooseBulkWriteOptions {}
