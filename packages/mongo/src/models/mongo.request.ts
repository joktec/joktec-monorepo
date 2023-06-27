import { IBaseRequest } from '@joktec/core';
import { PipelineStage } from 'mongoose';
import { MongoSchema } from './mongo.schema';

export type MongoBulkRequest = { conditions?: string[]; operator?: string; selectedFields?: string[] };

export type IMongoAggregation = PipelineStage;

export type IMongoProject = { [key: string]: 1 | 0 };

export type IMongoSorter = { [key: string]: 1 | -1 };

export interface IMongoRequest<T extends MongoSchema> extends IBaseRequest<T> {
  match?: { [key: string]: any };
  aggregations?: IMongoAggregation[];
}
