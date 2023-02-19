import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { Exception } from '../exception';
import { isPlainObject } from 'lodash';
import { ExceptionStatus } from '../exception-status';
import { LogService } from '../../log';

@Catch()
export class MicroExceptionFilter implements ExceptionFilter {
  constructor(private logger: LogService) {}

  catch(exception: any, host: ArgumentsHost): Observable<RpcException> {
    this.logger.error(exception, exception.message);

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
            status: ExceptionStatus.INTERNAL_SERVER_ERROR,
            message: exception.message,
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
          status: ExceptionStatus.INTERNAL_SERVER_ERROR,
          message: 'Critical internal server error occurred!',
        }),
    );
  }
}
