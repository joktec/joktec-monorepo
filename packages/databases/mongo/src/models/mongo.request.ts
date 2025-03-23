import { DeepPartial, IBaseRequest } from '@joktec/core';
import { mongoose, Ref } from '@typegoose/typegoose';
import { PipelineStage, RefType, UpdateQuery } from 'mongoose';
import { MongoSchema } from './mongo.schema';

export class ObjectId extends mongoose.Types.ObjectId {
  constructor(inputId?: string | ObjectId | Ref<any, RefType>) {
    super(inputId);
  }

  public static create(value?: string | ObjectId | Ref<any, RefType>): ObjectId {
    if (!value) return new ObjectId();
    return new ObjectId(value);
  }

  public static compare(
    first: string | ObjectId | Ref<any, RefType>,
    second: string | ObjectId | Ref<any, RefType>,
  ): boolean {
    if (!ObjectId.isValid(first) || !ObjectId.isValid(second)) return false;
    return new ObjectId(first).equals(second);
  }
}

export type IMongoUpdate<T extends MongoSchema> = DeepPartial<T> & UpdateQuery<T>;
export type IMongoPipeline = PipelineStage;
export type IMongoLookupPipeline = Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>;
export type IMongoUnionWithPipeline = Exclude<PipelineStage, PipelineStage.Out | PipelineStage.Merge>;
export type IMongoFacetPipeline = Exclude<
  PipelineStage,
  | PipelineStage.CollStats
  | PipelineStage.Facet
  | PipelineStage.GeoNear
  | PipelineStage.IndexStats
  | PipelineStage.Out
  | PipelineStage.Merge
  | PipelineStage.PlanCacheStats
>;
export type IMongoMergePipeline = Extract<
  PipelineStage,
  | PipelineStage.AddFields
  | PipelineStage.Set
  | PipelineStage.Project
  | PipelineStage.Unset
  | PipelineStage.ReplaceRoot
  | PipelineStage.ReplaceWith
>;

export interface IMongoRequest<T extends MongoSchema> extends IBaseRequest<T> {
  aggregations?: IMongoPipeline[];
}
