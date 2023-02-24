import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IResponseDto } from '../models';

@Injectable()
export class BaseResponseInterceptor<T = any> implements NestInterceptor<T, IResponseDto<T>> {
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
