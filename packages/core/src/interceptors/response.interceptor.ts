import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseDto } from '../models';

type ResponseType<T> = string | T | IResponseDto<T>;

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
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
