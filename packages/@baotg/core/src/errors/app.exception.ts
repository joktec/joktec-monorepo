import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { isPlainObject } from 'lodash';
import { Response, Request } from 'express';

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
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
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
      errorMessage = 'Critical internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);

    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    body: request.body,
    query: request.query,
    params: request.params,
    timeStamp: new Date(),
  });
}
