import { IBaseRequest } from '@joktec/core';
import { mongoose } from '@typegoose/typegoose';
import { PipelineStage } from 'mongoose';
import { MongoSchema } from './mongo.schema';

export class ObjectId extends mongoose.Types.ObjectId {
  public static create(value?: string | ObjectId): ObjectId {
    if (!value) return new ObjectId();
    return new ObjectId(value);
  }

  public static compare(first: string | ObjectId, second: string | ObjectId): boolean {
    if (!ObjectId.isValid(first) || !ObjectId.isValid(second)) return false;
    return new ObjectId(first).equals(second);
  }
}

export type MongoBulkRequest = { conditions?: string[]; operator?: string; fields?: string[] };

export type IMongoAggregation = PipelineStage;

export interface IMongoRequest<T extends MongoSchema> extends IBaseRequest<T> {
  aggregations?: IMongoAggregation[];
}
