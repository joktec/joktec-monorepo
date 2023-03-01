import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IBaseRequest, IResponseDto } from '../models';
import { toInt } from '../../utils';

@Injectable()
export class QueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.query = {
      condition: req.query?.condition || {},
      page: toInt(req.query?.page, 1),
      limit: toInt(req.query?.limit, 20),
      sort: req.query?.sort || { createdAt: 'desc' },
      language: req.headers['content-language'] || req.query?.language || '*',
      ...req.query,
    } as IBaseRequest;
    return next.handle();
  }
}

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<T, IResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseDto<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          timestamp: new Date(),
          status: true,
          code: HttpStatus.OK,
          message: 'Success',
          data,
        };
      }),
      catchError(err => throwError(() => err)),
    );
  }
}
