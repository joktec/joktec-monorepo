import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { isPlainObject, isString } from 'lodash';
import { GraphQLError } from 'graphql/index';
import { ExceptionMessage, ExceptionStatus } from '../exception-status';
import { RpcException } from '@nestjs/microservices';
import { ENV } from '../../config';
import { LogService } from '../../log';

interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  body: object;
  params: object;
  query: object;
  timeStamp: Date;
}

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

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage = (errorResponse as HttpExceptionResponse).error || exception.message;
    } else if (exception instanceof Error && exception.message) {
      errorMessage = exception.message;
    } else if (isPlainObject(exception)) {
      errorMessage = JSON.stringify(exception);
    } else {
      errorMessage = ExceptionMessage.INTERNAL_SERVER_ERROR;
    }

    const errorBody: CustomHttpExceptionResponse = {
      statusCode: status,
      error: errorMessage,
      path: request.url,
      method: request.method,
      body: request.body,
      query: request.query,
      params: request.params,
      timeStamp: new Date(),
    };
    response.status(status).json(errorBody);
  }

  private handleGqlException(exception: any, host: ArgumentsHost): GraphQLError {
    let message: string = exception?.message || ExceptionMessage.INTERNAL_SERVER_ERROR;
    let status: number = exception?.status || ExceptionStatus.INTERNAL_SERVER_ERROR;
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
      // message = ExceptionStatus[status];
      data = {};
    }

    return new GraphQLError(message, { extensions: { code: status, message, data } });
  }
}
