import { Express, Request, Response } from 'express';
// eslint-disable-next-line unused-imports/no-unused-imports
import { Multer } from 'multer';
import { JwtPayload } from '../guards';
import { Dictionary, IBaseRequest } from '../models';

export interface ExpressRequest<T extends object = any, U = any>
  extends Request<Dictionary, Dictionary, Dictionary, IBaseRequest<T>, Dictionary> {
  payload?: JwtPayload;
  loggedUser?: U;

  [key: string]: any;
}

export interface ExpressResponse extends Response<Dictionary, Dictionary> {}

export { Express, Request, Response, NextFunction } from 'express';

export type MulterFile = Express.Multer.File;
