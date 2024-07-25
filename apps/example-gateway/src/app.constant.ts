import { ExpressRequest, ExpressResponse } from '@joktec/core';
import { User } from './models/entities';

export type IResponse<T extends object = any> = ExpressResponse<T>;
export type IRequest<T extends object = any> = ExpressRequest<T, User>;

export const AUTH_GUARD_NAMESPACE = 'auth';
