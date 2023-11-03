import { ExpressRequest, ExpressResponse } from '@joktec/core';
import { User } from '../../modules/users/models';

export * from './location';

export type Response<T extends object = any> = ExpressResponse<T>;
export type Request<T extends object = any> = ExpressRequest<T, User>;
