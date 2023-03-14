import mongoose, { PipelineStage, PopulateOptions } from 'mongoose';
import { IBaseRequest } from '@joktec/core';

export type ObjectId = mongoose.Types.ObjectId;
export type MongoId = ObjectId | string;
export type MongoBulkRequest = { conditions?: string[]; operator?: string; selectedFields?: string[] };
export type IMongoAggregation = PipelineStage;

export interface IMongoRequest extends IBaseRequest {
  populate?: PopulateOptions[];
  match?: { [key: string]: any };
  lean?: boolean;
}
