import { Express, Request, Response } from 'express';
// eslint-disable-next-line unused-imports/no-unused-imports
import { Multer } from 'multer';
import { JwtPayload } from '../guards';
import { Dictionary, IBaseRequest } from '../models';
import { IResult } from 'ua-parser-js';
import { Lookup } from 'geoip-lite';

export type GeoIp = { ipAddress: string } & Lookup;
export type IUserAgent = IResult;
export { IBrowser, IDevice, IEngine, IOS, ICPU } from 'ua-parser-js';

export interface ExpressRequest<T extends object = any, U = any>
  extends Request<Dictionary, Dictionary, Dictionary, IBaseRequest<T>, Dictionary> {
  payload?: JwtPayload;
  loggedUser?: U;
  userAgent?: IUserAgent;
  geoIp?: GeoIp;

  [key: string]: any;
}

export interface ExpressResponse extends Response<Dictionary, Dictionary> {}

export { Express, Request, Response, NextFunction } from 'express';

export type MulterFile = Express.Multer.File;
