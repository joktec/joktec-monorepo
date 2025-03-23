import { BulkWriteOptions } from 'mongodb';
import { AggregateOptions, MongooseBulkWriteOptions, QueryOptions } from 'mongoose';

export interface IMongoOptions<T = any> extends QueryOptions<T> {
  paranoid?: boolean;
  force?: boolean;
}

export interface IMongoAggregateOptions<T> extends AggregateOptions {
  autoTransform?: boolean;
  transformFn?: (docs: any[]) => Array<T> | Promise<Array<T>>;
}

export interface IMongoBulkOptions extends BulkWriteOptions, MongooseBulkWriteOptions {
  chunkSize?: number;
}
