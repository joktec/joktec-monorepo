import { IBaseRequest } from '@joktec/core';
import { PipelineStage } from 'mongoose';
import { MongoSchema } from './mongo.schema';

export type MongoBulkRequest = { conditions?: string[]; operator?: string; selectedFields?: string[] };
export type IMongoAggregation = PipelineStage;

export interface IMongoRequest<T extends MongoSchema> extends IBaseRequest<T> {
  match?: { [key: string]: any };
}
