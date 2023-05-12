import { IBaseRequest } from '@joktec/core';
import { PipelineStage } from 'mongoose';
import { OrmSchema } from './orm.schema';

export type MongoBulkRequest = { conditions?: string[]; operator?: string; selectedFields?: string[] };
export type IMongoAggregation = PipelineStage;

export interface IMongoRequest<T extends OrmSchema> extends IBaseRequest<T> {
  match?: { [key: string]: any };
}
