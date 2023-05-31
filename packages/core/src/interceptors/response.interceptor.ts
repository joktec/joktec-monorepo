import { Reflector } from '@nestjs/core';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { RENDER_METADATA } from '@nestjs/common/constants';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNil } from 'lodash';
import { Request, Response } from 'express';
import { IResponseDto } from '../models';
import { NotFoundException } from '../exceptions';
import { instanceToPlain } from 'class-transformer';
import { LogService } from '../log';
import { RESPONSE_MESSAGE_KEY } from '../decorators';

type ResponseType<T> = string | T | IResponseDto<T>;
const ExcludePaths = ['/swagger', '/bulls', '/metrics'];

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<T, ResponseType<T>> {
  constructor(private reflector: Reflector, private logger: LogService) {
    this.logger.setContext(ResponseInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const renderMetadata = this.reflector.get<string>(RENDER_METADATA, context.getHandler());
    if (!!renderMetadata || ExcludePaths.includes(request.path)) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T) => {
        if (response.statusCode >= 300 && response.statusCode < 400) {
          const redirectUrl = response.getHeader('location');
          this.logger.info('Redirecting to: %s', redirectUrl);
        }

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
