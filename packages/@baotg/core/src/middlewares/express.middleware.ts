import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { parseListQuery, parseQuery } from '../utils/express';
import { HttpError } from '../utils/error';

@Injectable()
export class ParseListQueryMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    try {
      const myQuery = parseListQuery(req.query);
      Object.assign(req, { myQuery }); // tslint:disable-line: no-object-mutation

      next();
    } catch (err) {
      next(new HttpError(HttpStatus.BAD_REQUEST, err as Error));
    }
  }
}

@Injectable()
export class ParseQueryMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    try {
      const myQuery = parseQuery(req.query);
      Object.assign(req, { myQuery }); // tslint:disable-line: no-object-mutation

      next();
    } catch (err) {
      next(new HttpError(HttpStatus.BAD_REQUEST, err as Error));
    }
  }
}
