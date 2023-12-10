import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { has, head, set } from 'lodash';
import { Observable } from 'rxjs';
import { ExpressRequest, ExpressResponse } from '../base';
import { IBaseRequest } from '../models';
import { nullKeysToObject, parseLang, toInt } from '../utils';

@Injectable()
export class QueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    const res = context.switchToHttp().getResponse<ExpressResponse>();

    res.locals.query = req.query;
    res.locals.body = req.body;
    res.locals.params = req.params;
    req.query = {
      ...req.query,
      condition: nullKeysToObject(req.query?.condition),
      sort: req.query?.sort || { createdAt: 'desc' },
      language: head(parseLang(req)) || req.query?.language || '*',
    } as IBaseRequest<any>;

    const query: IBaseRequest<any> = {
      ...req.query,
      condition: nullKeysToObject(req.query?.condition),
      sort: req.query?.sort || { createdAt: 'desc' },
      language: head(parseLang(req)) || req.query?.language || '*',
    };

    const page = toInt(req.query?.page, 1);
    const limit = toInt(req.query?.limit, 20);
    const offset = toInt(req.query?.offset, (page - 1) * limit);
    Object.assign(query, { page, limit, offset });

    if (has(req.params, 'id')) {
      set(query, 'condition.id', req.params.id);
    }

    req.query = query;
    return next.handle();
  }
}
