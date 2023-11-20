import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { RENDER_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import { instanceToPlain } from 'class-transformer';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpressRequest, ExpressResponse } from '../base';
import { HttpStatus } from '../constants';
import { RESPONSE_MESSAGE_KEY, SUCCESS_STATUS_KEY } from '../decorators';
import { LogService } from '../logger';
import { IResponseDto } from '../models';

type ResponseType<T> = string | T | IResponseDto<T>;
const ExcludePaths = ['/swagger', '/bulls', '/metrics'];

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<T, ResponseType<T>> {
  constructor(
    private reflector: Reflector,
    private logger: LogService,
  ) {
    this.logger.setContext(ResponseInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const response = context.switchToHttp().getResponse<ExpressResponse>();
    const handler = context.getHandler();

    const renderMetadata = this.reflector.get<string>(RENDER_METADATA, handler);
    if (!!renderMetadata || ExcludePaths.includes(request.path)) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T) => {
        if (response.statusCode >= 300 && response.statusCode < 400) {
          const redirectUrl = response.getHeader('location');
          this.logger.info('Redirecting to: %s', redirectUrl);
        }

        const httpStatus = this.reflector.get<number | HttpStatus>(SUCCESS_STATUS_KEY, handler);
        response.status(httpStatus || HttpStatus.OK);
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
