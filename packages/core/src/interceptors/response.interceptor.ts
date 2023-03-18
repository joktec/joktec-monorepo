import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { IResponseDto } from '../models';
import { catchError, map, Observable, throwError } from 'rxjs';
import { isNil } from 'lodash';
import { NotFoundException } from '../exceptions';

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<T, IResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseDto<T>> {
    return next.handle().pipe(
      map(data => {
        if (isNil(data)) throw new NotFoundException();
        return {
          timestamp: new Date(),
          success: true,
          status: HttpStatus.OK,
          message: 'SUCCESS',
          data,
        };
      }),
      catchError(err => throwError(() => err)),
    );
  }
}
