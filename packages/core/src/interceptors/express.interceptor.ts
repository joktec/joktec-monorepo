import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { head } from 'lodash';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpressRequest, ExpressResponse, IBaseRequest, IResponseDto } from '../models';
import { nullKeysToObject, resolverLanguage, toInt } from '../utils';

export type ExpressResponseType<T> = string | T | IResponseDto<T>;

@Injectable()
export class ExpressInterceptor<T = any> implements NestInterceptor<T, ExpressResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<ExpressRequest>();
    const res = context.switchToHttp().getResponse<ExpressResponse>();

    this.backupQuery(req, res);
    req.query = this.transformQuery(req);

    return next.handle().pipe(
      map((data: T) => this.transformData(data)),
      catchError(err => this.handleError(err)),
    );
  }

  backupQuery(req: ExpressRequest, res: ExpressResponse) {
    res.locals.query = req.query;
    res.locals.body = req.body;
    res.locals.params = req.params;
  }

  transformQuery(req: ExpressRequest): IBaseRequest<any> {
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

    if (req.query?.offset) delete query.page;
    if (!query.language) {
      const language = resolverLanguage(req.headers['accept-language'] || '');
      query.language = head(language) || '*';
    }

    return query;
  }

  transformData(data: T): ExpressResponseType<T> {
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
  }

  handleError(err: any): Observable<any> {
    return throwError(() => err);
  }
}
