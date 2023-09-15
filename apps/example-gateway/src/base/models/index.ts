import { ExpressRequest, ExpressResponse } from '@joktec/core';
import { User } from '../../modules/users';

export * from './location';

export type Request<T extends object = any> = ExpressRequest<T, User>;
export type Response = ExpressResponse;
