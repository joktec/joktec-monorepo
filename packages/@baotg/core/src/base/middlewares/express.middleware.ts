import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { parseListQuery, parseQuery } from '../../utils';
import { HttpError } from '../../utils';

@Injectable()
export class ParseListQueryMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    try {
      const myQuery = parseListQuery(req.query);
      Object.assign(req, { myQuery });
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
      Object.assign(req, { myQuery });
      next();
    } catch (err) {
      next(new HttpError(HttpStatus.BAD_REQUEST, err as Error));
    }
  }
}
