import { ExpressRequest, ExpressResponse } from '@joktec/core';
import { User } from './models/schemas';

export type IResponse<T extends object = any> = ExpressResponse<T>;
export type IRequest<T extends object = any> = ExpressRequest<T, User>;

export enum LOCALE {
  KO = 'ko',
  EN = 'en',
}

export const DEFAULT_LOCALE = LOCALE.KO;
export const EXAMPLE_MONGO_ID = '507f1f77bcf86cd799439011';
