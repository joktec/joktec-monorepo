import { mongoose } from '@typegoose/typegoose';
import { PipelineStage, PopulateOptions, SortOrder } from 'mongoose';

export type ObjectId = mongoose.Types.ObjectId;
export type MongoBulkRequest = { conditions?: string[]; operator?: string; selectedFields?: string[] };
export type MongoAggregation = PipelineStage;
export type MongoCondition = { [key: string]: any };
export type MongoLanguage = '*' | 'vi' | 'en';
export type MongoSortOrder = SortOrder;
export type MongoSort =
  | string
  | { [key: string]: MongoSortOrder | { $meta: 'textScore' } }
  | [string, MongoSortOrder][]
  | undefined
  | null;

export interface MongoQuery {
  condition: MongoCondition;
  language?: MongoLanguage;
  limit?: number;
  page?: number;
  select?: string;
  sort?: MongoSort;
  populate?: PopulateOptions[];
  match?: MongoCondition;
  lean?: boolean;
}
