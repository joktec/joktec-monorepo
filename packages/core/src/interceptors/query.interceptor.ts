import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { nullKeysToObject, toInt } from '../utils';
import { IBaseRequest } from '../models';

@Injectable()
export class QueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.originQuery = req.query;
    req.query = {
      ...req.query,
      page: toInt(req.query?.page, 1),
      limit: toInt(req.query?.limit, 20),
      sort: req.query?.sort || { createdAt: 'desc' },
      language: req.headers['content-language'] || req.query?.language || '*',
    } as IBaseRequest<any>;
    req.query.condition = nullKeysToObject(req.query?.condition);
    return next.handle();
  }
}
