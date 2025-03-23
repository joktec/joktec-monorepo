import { Express, Request, Response } from 'express';
// eslint-disable-next-line unused-imports/no-unused-imports
import { Multer } from 'multer';
import { JwtPayload } from '../modules';
import { DeepPartial, Dictionary, Entity } from './base.dto';
import { IBaseRequest } from './base.request';
import { GeoIp, IUserAgent } from './utils';

export interface ExpressResponse<T extends Entity = any> extends Response<DeepPartial<T> | Dictionary, Dictionary> {}

export interface ExpressRequest<T extends Entity = any, U = any>
  extends Request<Dictionary, ExpressResponse<T>, DeepPartial<T> & Dictionary, IBaseRequest<T>, Dictionary> {
  payload?: JwtPayload;
  loggedUser?: U;
  userAgent?: IUserAgent;
  geoIp?: GeoIp;
  locale?: string;
  timezone?: string;

  [key: string]: any;
}

export type MulterFile = Express.Multer.File;
