import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseExceptionFilter } from '@nestjs/core';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions';
import { RpcException } from '@nestjs/microservices';
import { get, has, isEmpty, isString } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { ExpressRequest, ExpressResponse, HttpStatus, IExceptionFilter, IResponseDto } from '../../models';
import { Exception } from '../exception';
import { ExceptionMessage } from '../exception-message';

@Catch()
export class GatewayExceptionsFilter extends BaseExceptionFilter implements IExceptionFilter {
  constructor(
    protected configService: ConfigService,
    protected logService: PinoLogger,
  ) {
    super();
    this.logService.setContext(GatewayExceptionsFilter.name);
  }

  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<ExpressResponse>();
    const type: string = host.getType();

    // Build error dto
    this.debug(exception);
    const status: number = this.transformStatus(exception);
    const errorBody: IResponseDto = {
      timestamp: new Date(),
      success: false,
      error: this.transformError(exception),
      message: this.transformMessage(exception),
      title: this.transformTitle(exception),
      code: this.transformCode(exception),
    };

    const miniError = this.minify(host, errorBody);
    // Return error for each type
    switch (type) {
      case 'http':
        return res.status(status).json(miniError);
      case 'graphql':
        return new GraphQLException(errorBody.message, { extensions: { http: { status }, data: miniError } });
      default:
        this.logService.error(exception['data'] || exception, exception.message || ExceptionMessage.SOMETHING_WHEN_WRONG);
        break;
    }
  }

  transformStatus(exception: Error): number {
    if (has(exception, 'error.status')) return get(exception, 'error.status');
    if (has(exception, 'status')) return get(exception, 'status');
    if (exception instanceof HttpException) return exception.getStatus();
    if (exception instanceof RpcException) {
      const error = exception.getError();
      return isString(error) ? ExceptionMessage.INTERNAL_SERVER_ERROR : (error as any).status;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  transformError(exception: Error): any {
    if (has(exception, 'error.data')) return get(exception, 'error.data');
    if (has(exception, 'data')) return get(exception, 'data');
    if (exception instanceof HttpException) return exception.getResponse();
    if (exception instanceof RpcException) return exception.getError();
    return exception;
  }

  transformMessage(exception: Error): string {
    if (has(exception, 'error.message')) return get(exception, 'error.message');
    if (exception instanceof HttpException) {
      const error = exception.getResponse();
      return isString(error) ? error : exception.message;
    }
    if (exception instanceof RpcException) {
      const error = exception.getError();
      return isString(error) ? error : (error as any).message;
    }
    if (exception instanceof Exception && exception?.message) return exception.message;
    return get(exception, 'message', ExceptionMessage.INTERNAL_SERVER_ERROR);
  }

  transformTitle(exception: Error): string {
    if (has(exception, 'error.title')) return get(exception, 'error.title');
    if (has(exception, 'title')) return get(exception, 'title');
    return ExceptionMessage.ERROR_TITLE;
  }

  transformCode(exception: Error): number {
    if (has(exception, 'error.code')) return get(exception, 'error.code');
    if (has(exception, 'code')) return get(exception, 'code');
    return 0;
  }

  debug(exception: Error) {
    const status = this.transformStatus(exception);
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logService.error(exception['data'] || exception, exception.message || ExceptionMessage.SOMETHING_WHEN_WRONG);
    }

    const hideWarning = this.configService.get<boolean>('log.hideWarning', true);
    if (hideWarning) return;
    if (status < HttpStatus.INTERNAL_SERVER_ERROR) {
      const msg = this.transformMessage(exception);
      this.logService.error(exception, msg);
    }
  }

  minify(host: ArgumentsHost, errorBody: IResponseDto): IResponseDto {
    const req = host.switchToHttp().getRequest<ExpressRequest>();
    const res = host.switchToHttp().getResponse<ExpressResponse>();
    if (errorBody.data) delete errorBody.data;
    const isProd: boolean = this.configService.get<boolean>('isProd', false);
    if (!isProd) {
      Object.assign(errorBody, { path: req.url, method: req.method });
      if (!isEmpty(res.locals.body)) errorBody.body = res.locals.body;
      if (!isEmpty(res.locals.query)) errorBody.query = res.locals.query;
      if (!isEmpty(res.locals.params)) errorBody.params = res.locals.params;
    }
    return errorBody;
  }
}
