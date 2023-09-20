import { IListResponseDto } from '@joktec/core';
import { MongoSchema } from './mongo.schema';

export interface IMongoResponse<T extends MongoSchema> extends IListResponseDto<T> {}
