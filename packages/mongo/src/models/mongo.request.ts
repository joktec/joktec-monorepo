import { IBaseRequest } from '@joktec/core';
import { PipelineStage } from 'mongoose';

export type MongoBulkRequest = { conditions?: string[]; operator?: string; selectedFields?: string[] };
export type IMongoAggregation = PipelineStage;

export interface IMongoRequest extends IBaseRequest {
  match?: { [key: string]: any };
}
