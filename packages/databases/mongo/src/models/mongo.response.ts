import { IPaginationResponse } from '@joktec/core';
import { MongoSchema } from './mongo.schema';

export interface IMongoPaginationResponse<T extends MongoSchema> extends IPaginationResponse<T> {}
