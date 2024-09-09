import { ExpressRequest, ExpressResponse } from '@joktec/core';
import { Session, User } from './models/schemas';

export interface IResponse<T extends object = any> extends ExpressResponse<T> {}

export interface IRequest<T extends object = any> extends ExpressRequest<T, User> {
  locale?: string;
  timezone?: string;
  instances?: T[];
  session?: Session;

  deviceModel: string;
  deviceOs: string;
  deviceId: string;
  osVersion: string;
  appVersion: string;
  appBuild: number;
}

export enum LOCALE {
  KO = 'ko',
  EN = 'en',
}

export const DEFAULT_LOCALE = LOCALE.KO;
export const EXAMPLE_MONGO_ID = '507f1f77bcf86cd799439011';

export const AUTH_GUARD_NAMESPACE = 'auth';

export const TRANSPORT = {
  NAME: {
    REDIS: 'RedisTransport',
  },
  PROXY: {
    ARTICLE: 'ArticleProxyClient',
    ASSET: 'AssetProxyClient',
    OTP: 'OtpProxyClient',
    USER: 'UserProxyClient',
  },
};
