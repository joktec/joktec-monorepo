import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let access_token = req.header("Authorization");
    if(access_token != "d57ed083-a4da-49ba-831f-29983c1d058e") {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    next();
  }
}
