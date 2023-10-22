import { IBaseRequest } from '@joktec/core';
import { mongoose } from '@typegoose/typegoose';
import { PipelineStage } from 'mongoose';
import { MongoSchema } from './mongo.schema';

export class ObjectId extends mongoose.Types.ObjectId {
  public static compare(first: string | ObjectId, second: string | ObjectId): boolean {
    if (!ObjectId.isValid(first) || !ObjectId.isValid(second)) return false;
    return new ObjectId(first).equals(second);
  }
}

export type MongoBulkRequest = { conditions?: string[]; operator?: string; fields?: string[] };

export type IMongoAggregation = PipelineStage;

export type IMongoProject = { [key: string]: 1 | 0 };

export type IMongoSorter = { [key: string]: 1 | -1 };

export interface IMongoRequest<T extends MongoSchema> extends IBaseRequest<T> {
  match?: { [key in keyof T]: any };
  aggregations?: IMongoAggregation[];
}
