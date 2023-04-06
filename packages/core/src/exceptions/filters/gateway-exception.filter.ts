import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { isEmpty, isString } from 'lodash';
import { GraphQLError } from 'graphql/index';
import { ExceptionMessage } from '../exception-message';
import { RpcException } from '@nestjs/microservices';
import { ENV } from '../../config';
import { IResponseDto } from '../../models';

@Catch()
export class GatewayExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const type: string = host.getType();

    if (type === 'http') {
      this.handleHttpException(exception, host);
      return;
    }

    if (type === 'graphql') {
      throw this.handleGqlException(exception);
    }

    Logger.error('Something when wrong', exception.stack, GatewayExceptionsFilter.name);
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
      Logger.error('Something when wrong', exception.stack, GatewayExceptionsFilter.name);
    }

    const errorBody: IResponseDto = {
      timestamp: new Date(),
      success: false,
      message,
      error: errorData,
    };
    const isProd: boolean = process.env.NODE_ENV === 'production';
    if (!isProd) {
      Object.assign(errorBody, { path: request.url, method: request.method });
      if (!isEmpty(request.body)) errorBody.body = request.body;
      if (!isEmpty(request.query)) errorBody.query = request.query;
      if (!isEmpty(request.params)) errorBody.params = request.params;
    }
    response.status(status).json({ ...errorBody });
  }

  private handleGqlException(exception: any): GraphQLError {
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
      Logger.error(exception.message, exception.stack, GatewayExceptionsFilter.name);
    }

    // Hidden message in Production
    const env: ENV = (process.env['NODE_ENV'] ?? ENV.DEV) as ENV;
    if (env === ENV.PROD) {
      data = {};
    }

    return new GraphQLError(message, { extensions: { code: status, message, data } });
  }
}
