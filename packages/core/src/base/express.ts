import { Express, Request, Response } from 'express';
import { Lookup } from 'geoip-lite';
// eslint-disable-next-line unused-imports/no-unused-imports
import { Multer } from 'multer';
import { IResult } from 'ua-parser-js';
import { JwtPayload } from '../guards';
import { DeepPartial, Dictionary, IBaseRequest } from '../models';

export type GeoIp = { ipAddress: string } & Lookup;
export type IUserAgent = IResult;
export { IBrowser, IDevice, IEngine, IOS, ICPU } from 'ua-parser-js';

export interface ExpressResponse<T extends object = any> extends Response<DeepPartial<T> | Dictionary, Dictionary> {}

export interface ExpressRequest<T extends object = any, U = any>
  extends Request<Dictionary, ExpressResponse<T>, DeepPartial<T> & Dictionary, IBaseRequest<T>, Dictionary> {
  payload?: JwtPayload;
  loggedUser?: U;
  userAgent?: IUserAgent;
  geoIp?: GeoIp;

  [key: string]: any;
}

export { Express, Request, Response, NextFunction } from 'express';

export type MulterFile = Express.Multer.File;
