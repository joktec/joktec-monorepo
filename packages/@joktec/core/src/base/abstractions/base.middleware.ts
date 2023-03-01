import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../../exceptions';

@Injectable()
export class ParseQueryMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (err) {
      next(new BadRequestException('Bad request', err));
    }
  }
}
