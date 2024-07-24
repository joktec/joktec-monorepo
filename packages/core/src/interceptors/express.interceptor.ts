import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { has, head, set } from 'lodash';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpressRequest, ExpressResponse, IBaseRequest, IResponseDto } from '../models';
import { nullKeysToObject, resolverLanguage, toInt } from '../utils';

type ResponseType<T> = string | T | IResponseDto<T>;

@Injectable()
export class ExpressInterceptor<T = any> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    const res = context.switchToHttp().getResponse<ExpressResponse>();

    res.locals.query = req.query;
    res.locals.body = req.body;
    res.locals.params = req.params;

    const page = toInt(req.query?.page, 1);
    const limit = toInt(req.query?.limit, 20);
    const offset = toInt(req.query?.offset, (page - 1) * limit);
    const query: IBaseRequest<any> = {
      ...req.query,
      condition: nullKeysToObject(req.query?.condition || {}),
      sort: req.query?.sort || {},
      page,
      limit,
      offset,
    };

    if (!query.language) {
      const language = resolverLanguage(req.headers['accept-language']);
      query.language = head(language) || '*';
    }

    if (has(req.params, 'id')) {
      set(query, 'condition.id', req.params.id);
    }

    req.query = query;

    return next.handle().pipe(
      map((data: T) => {
        if (typeof data === 'object') {
          return {
            timestamp: new Date(),
            success: true,
            errorCode: 0,
            message: 'Success',
            data: data ? instanceToPlain<T>(data) : undefined,
          } as IResponseDto<T>;
        }
        return data;
      }),
      catchError(err => throwError(() => err)),
    );
  }
}
