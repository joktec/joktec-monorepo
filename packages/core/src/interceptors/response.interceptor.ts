import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { isNil } from 'lodash';
import { IResponseDto } from '../models';
import { NotFoundException } from '../exceptions';

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<T, IResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseDto<T>> {
    return next.handle().pipe(
      map(data => {
        if (isNil(data)) throw new NotFoundException();
        const response = context.switchToHttp().getResponse();
        response.status(HttpStatus.OK);
        return {
          timestamp: new Date(),
          success: true,
          errorCode: 0,
          message: 'SUCCESS',
          data,
        } as IResponseDto<T>;
      }),
      catchError(err => throwError(() => err)),
    );
  }
}
