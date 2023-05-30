import { Reflector } from '@nestjs/core';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { RENDER_METADATA } from '@nestjs/common/constants';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNil } from 'lodash';
import { IResponseDto } from '../models';
import { NotFoundException } from '../exceptions';
import { instanceToPlain } from 'class-transformer';
import { LogService } from '../log';
import { RESPONSE_MESSAGE_KEY } from '../decorators';

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<T, T | IResponseDto<T>> {
  constructor(private reflector: Reflector, private logger: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T | IResponseDto<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const response = context.switchToHttp().getResponse();

        if (response.statusCode >= 300 && response.statusCode < 400) {
          const redirectUrl = response.getHeader('location');
          this.logger.info('Redirecting to: %s', redirectUrl);
        }

        const renderMetadata = this.reflector.get<string>(RENDER_METADATA, context.getHandler());
        if (renderMetadata) return instanceToPlain<T>(data) as T;

        if (isNil(data)) throw new NotFoundException();
        response.status(HttpStatus.OK);
        return {
          timestamp: new Date(),
          success: true,
          errorCode: 0,
          message: this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) || 'SUCCESS',
          data: instanceToPlain<T>(data),
        } as IResponseDto<T>;
      }),
      catchError(err => throwError(() => err)),
    );
  }
}
