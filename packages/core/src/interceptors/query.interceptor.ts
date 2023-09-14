import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequest, ExpressResponse } from '../base';
import { IBaseRequest } from '../models';
import { nullKeysToObject, toInt } from '../utils';

@Injectable()
export class QueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: ExpressRequest = context.switchToHttp().getRequest();
    const res: ExpressResponse = context.switchToHttp().getResponse();

    res.locals.query = req.query;
    res.locals.body = req.body;
    res.locals.params = req.params;
    req.query = {
      ...req.query,
      condition: nullKeysToObject(req.query?.condition),
      page: toInt(req.query?.page, 1),
      limit: toInt(req.query?.limit, 20),
      sort: req.query?.sort || { createdAt: 'desc' },
      language: req.headers['content-language'] || req.query?.language || '*',
    } as IBaseRequest<any>;

    return next.handle();
  }
}
