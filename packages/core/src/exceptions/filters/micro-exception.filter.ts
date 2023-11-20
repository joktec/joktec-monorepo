import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { isPlainObject } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { HttpStatus } from '../../constants';
import { Exception } from '../exception';
import { ExceptionMessage } from '../exception-message';

@Catch()
export class MicroExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<RpcException> {
    if (exception instanceof Exception || exception instanceof RpcException) {
      return throwError(() => exception.getError());
    }

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      const resMessage = typeof errorResponse === 'string' ? errorResponse : (errorResponse as any).message;
      const error = new RpcException({
        status: exception.getStatus(),
        message: resMessage || exception.message,
        data: exception.getResponse(),
      });
      return throwError(() => error);
    }

    if (exception instanceof Error && exception.message) {
      return throwError(
        () =>
          new RpcException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message || ExceptionMessage.INTERNAL_SERVER_ERROR,
            data: exception.stack,
          }),
      );
    }

    if (isPlainObject(exception)) {
      return throwError(() => new RpcException(exception));
    }

    return throwError(
      () =>
        new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ExceptionMessage.INTERNAL_SERVER_ERROR,
          data: exception.stack,
        }),
    );
  }
}
