import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { isString } from 'lodash';
import { GraphQLError } from 'graphql/index';
import { ExceptionMessage } from '../exception-message';
import { RpcException } from '@nestjs/microservices';
import { ENV } from '../../config';
import { LogService } from '../../log';
import { IResponseDto } from '../../models';

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
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: number = exception?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = exception?.message || ExceptionMessage.INTERNAL_SERVER_ERROR;
    let errorData: any = exception?.data || exception;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message = isString(errorResponse) ? errorResponse : exception.message;
      errorData = errorResponse;
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception, 'Something when wrong');
    }

    const isProd: boolean = process.env.NODE_ENV === 'production';
    const errorBody: IResponseDto = { timestamp: new Date(), success: false, status, message };
    if (!isProd) {
      Object.assign(errorBody, {
        error: errorData,
        path: request.url,
        method: request.method,
      });
      if (request.body) errorBody.body = request.body;
      if (request.query) errorBody.query = request.query;
      if (request.params) errorBody.params = request.params;
    }
    response.status(status).json(errorBody);
  }

  private handleGqlException(exception: any, host: ArgumentsHost): GraphQLError {
    let message: string = exception?.message || ExceptionMessage.INTERNAL_SERVER_ERROR;
    let status: string | number = exception?.status || ExceptionMessage.INTERNAL_SERVER_ERROR;
    let data: any = exception?.data;

    if (exception instanceof RpcException) {
      const error = exception.getError();
      message = isString(error) ? error : (error as any).message;
      status = isString(error) ? ExceptionMessage.INTERNAL_SERVER_ERROR : (error as any).status;
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
