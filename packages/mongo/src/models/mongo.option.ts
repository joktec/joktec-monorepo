import { ILanguage } from '@joktec/core';
import { BulkWriteOptions } from 'mongodb';
import { AggregateOptions, MongooseBulkWriteOptions, QueryOptions } from 'mongoose';

export interface IMongoOptions<T = any> extends QueryOptions<T> {
  language?: ILanguage;

  paranoid?: boolean;
  force?: boolean;
  deletedBy?: any;
  restoredBy?: any;
}

export interface IMongoAggregateOptions extends AggregateOptions {
  language?: ILanguage;
}

export interface IMongoBulkOptions extends BulkWriteOptions, MongooseBulkWriteOptions {
  language?: ILanguage;
}
