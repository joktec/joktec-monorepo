import { Express, Request, Response } from 'express';
import { Lookup } from 'geoip-lite';
// eslint-disable-next-line unused-imports/no-unused-imports
import { Multer } from 'multer';
import { IResult } from 'ua-parser-js';
import { JwtPayload } from '../modules';
import { DeepPartial, Dictionary, Entity } from './base.dto';
import { IBaseRequest } from './base.request';

export type GeoIp = { ipAddress: string } & Lookup;
export type IUserAgent = IResult;
export { IBrowser, IDevice, IEngine, IOS, ICPU } from 'ua-parser-js';

export interface ExpressResponse<T extends Entity = any> extends Response<DeepPartial<T> | Dictionary, Dictionary> {}

export interface ExpressRequest<T extends Entity = any, U = any>
  extends Request<Dictionary, ExpressResponse<T>, DeepPartial<T> & Dictionary, IBaseRequest<T>, Dictionary> {
  payload?: JwtPayload;
  loggedUser?: U;
  userAgent?: IUserAgent;
  geoIp?: GeoIp;

  [key: string]: any;
}

export type MulterFile = Express.Multer.File;
