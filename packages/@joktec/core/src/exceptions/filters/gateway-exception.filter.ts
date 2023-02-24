import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { isPlainObject, isString } from 'lodash';
import { GraphQLError } from 'graphql/index';
import { ExceptionMessage, ExceptionStatus } from '../exception-status';
import { RpcException } from '@nestjs/microservices';
import { ENV } from '../../config';
import { LogService } from '../../log';
import { IResponseDto } from '../../base';

@Catch()
export class GatewayExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LogService) {}

  catch(exception: any, host: ArgumentsHost): any {
    const type: string = host.getType();

    if (type === 'http') {
      this.handleHttpException(exception, host);
      return;
    }

    if (type === 'graphql') {
      throw this.handleGqlException(exception, host);
    }

    this.logger.error(exception, 'Something when wrong');
  }

  private handleHttpException(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage = (errorResponse as IResponseDto).error || exception.message;
    } else if (exception instanceof Error && exception.message) {
      errorMessage = exception.message;
    } else if (isPlainObject(exception)) {
      errorMessage = JSON.stringify(exception);
    } else {
      errorMessage = ExceptionMessage.INTERNAL_SERVER_ERROR;
    }

    if (httpStatus >= 500) {
      this.logger.error(exception, 'Something when wrong');
    }

    const isProd: boolean = process.env.NODE_ENV === 'production';
    const errorBody: IResponseDto = {
      timestamp: new Date(),
      status: false,
      code: httpStatus,
      message: errorMessage,
      error: !isProd && exception,
      path: !isProd && request.url,
      method: !isProd && request.method,
      body: !isProd && request.body,
      query: !isProd && request.query,
      params: !isProd && request.params,
    };
    response.status(httpStatus).json(errorBody);
  }

  private handleGqlException(exception: any, host: ArgumentsHost): GraphQLError {
    let message: string = exception?.message || ExceptionMessage.INTERNAL_SERVER_ERROR;
    let status: string | number = exception?.status || ExceptionStatus.INTERNAL_SERVER_ERROR;
    let data: any = exception?.data;

    if (exception instanceof RpcException) {
      const error = exception.getError();
      message = isString(error) ? error : (error as any).message;
      status = isString(error) ? ExceptionStatus.INTERNAL_SERVER_ERROR : (error as any).status;
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = typeof response === 'string' ? response : (response as any).message;
      status = exception.getStatus();
      data = exception.getResponse();
    }

    // If exception status is gte 500, it will be print in log console
    if (500 <= status && status <= 999) {
      this.logger.error(exception, exception.message);
    }

    // Hidden message in Production
    const env: ENV = (process.env['NODE_ENV'] ?? ENV.DEV) as ENV;
    if (env === ENV.PROD) {
      data = {};
    }

    return new GraphQLError(message, { extensions: { code: status, message, data } });
  }
}
