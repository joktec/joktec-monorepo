import { HttpStatus } from '@joktec/utils';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { get, has, isString } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { Observable, throwError } from 'rxjs';
import { IExceptionFilter, IResponseDto } from '../../models';
import { Exception, IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { MicroRpcException } from '../micro-rpc.exception';

@Catch()
export class MicroExceptionFilter extends BaseRpcExceptionFilter implements IExceptionFilter {
  constructor(
    protected configService: ConfigService,
    protected logService: PinoLogger,
  ) {
    super();
    this.logService.setContext(MicroExceptionFilter.name);
  }

  catch(exception: any, _: ArgumentsHost): Observable<RpcException> {
    // Build error dto
    this.debug(exception);
    const status: number = this.transformStatus(exception);
    const errorData: any = this.transformError(exception);
    const msg: IExceptionMessage = {
      message: this.transformMessage(exception),
      title: this.transformTitle(exception),
      code: this.transformCode(exception),
    };

    // Convert to MicroRpcException and throw it
    const baseException = new Exception(msg, status, errorData);
    return throwError(() => new MicroRpcException(baseException));
  }

  transformStatus(exception: Error): number {
    if (has(exception, 'error.status')) return get(exception, 'error.status') as number;
    if (has(exception, 'status')) return get(exception, 'status') as number;
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
    if (has(exception, 'error.message')) return get(exception, 'error.message') as string;
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
    if (has(exception, 'error.title')) return get(exception, 'error.title') as string;
    if (has(exception, 'title')) return get(exception, 'title') as string;
    return ExceptionMessage.ERROR_TITLE;
  }

  transformCode(exception: Error): number {
    if (has(exception, 'error.code')) return get(exception, 'error.code') as number;
    if (has(exception, 'code')) return get(exception, 'code') as number;
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
    if (errorBody.data) delete errorBody.data;
    return errorBody;
  }
}
