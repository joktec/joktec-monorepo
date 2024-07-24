import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions';
import { RpcException } from '@nestjs/microservices';
import { get, has, isEmpty, isString } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { ExpressRequest, ExpressResponse, HttpStatus, IExceptionFilter, IResponseDto } from '../../models';
import { Exception } from '../exception';
import { ExceptionMessage } from '../exception-message';

@Catch()
export class GatewayExceptionsFilter implements IExceptionFilter {
  constructor(
    protected cfg: ConfigService,
    protected logger: PinoLogger,
  ) {
    this.logger.setContext(GatewayExceptionsFilter.name);
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
      title: get(exception, 'title', 'Error'),
      code: get(exception, 'code', 0),
    };

    const miniError = this.minify(host, errorBody);
    // Return error for each type
    switch (type) {
      case 'http':
        return res.status(status).json(this.minify(host, miniError));
      case 'graphql':
        return new GraphQLException(errorBody.message, { extensions: { http: { status }, data: miniError } });
      default:
        this.logger.error(exception['data'] || exception, exception.message || 'Something when wrong');
        break;
    }
  }

  private transformStatus(exception: Error): number {
    if (has(exception, 'status')) return get(exception, 'status');
    if (exception instanceof HttpException) return exception.getStatus();
    if (exception instanceof RpcException) {
      const error = exception.getError();
      return isString(error) ? ExceptionMessage.INTERNAL_SERVER_ERROR : (error as any).status;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private transformError(exception: Error): any {
    if (has(exception, 'data')) return get(exception, 'data');
    if (exception instanceof HttpException) return exception.getResponse();
    if (exception instanceof RpcException) return exception.getError();
    return exception;
  }

  private transformMessage(exception: Error): string {
    if (exception instanceof HttpException) {
      const error = exception.getResponse();
      return isString(error) ? error : exception.message;
    }
    if (exception instanceof RpcException) {
      const error = exception.getError();
      return isString(error) ? error : (error as any).message;
    }
    if (exception instanceof Exception && exception?.message) return exception.message;
    return ExceptionMessage.INTERNAL_SERVER_ERROR;
  }

  public debug(exception: Error) {
    const status = this.transformStatus(exception);
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception['data'] || exception, exception.message || 'Something when wrong');
    }

    const hideWarning = this.cfg.get<boolean>('log.hideWarning', true);
    if (hideWarning) return;
    if (status < HttpStatus.INTERNAL_SERVER_ERROR) {
      const msg = this.transformMessage(exception);
      this.logger.error(exception, msg);
    }
  }

  public minify(host: ArgumentsHost, errorBody: IResponseDto): IResponseDto {
    const req = host.switchToHttp().getRequest<ExpressRequest>();
    const res = host.switchToHttp().getResponse<ExpressResponse>();
    if (errorBody.data) delete errorBody.data;
    const isProd: boolean = this.cfg.get<boolean>('isProd', false);
    if (!isProd) {
      Object.assign(errorBody, { path: req.url, method: req.method });
      if (!isEmpty(res.locals.body)) errorBody.body = res.locals.body;
      if (!isEmpty(res.locals.query)) errorBody.query = res.locals.query;
      if (!isEmpty(res.locals.params)) errorBody.params = res.locals.params;
    }
    return errorBody;
  }
}
