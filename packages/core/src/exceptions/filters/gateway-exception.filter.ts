import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GraphQLError } from 'graphql/index';
import { isEmpty, isString } from 'lodash';
import { ExpressRequest, ExpressResponse } from '../../base';
import { ConfigService, ENV } from '../../config';
import { LogService } from '../../logger';
import { IResponseDto } from '../../models';
import { IValidateError, ValidateException } from '../../validation';
import { ExceptionMessage } from '../exception-message';

@Catch()
export class GatewayExceptionsFilter implements ExceptionFilter {
  constructor(
    private cfg: ConfigService,
    private logger: LogService,
  ) {
    this.logger.setContext(GatewayExceptionsFilter.name);
  }

  catch(exception: any, host: ArgumentsHost): any {
    const type: string = host.getType();
    switch (type) {
      case 'http':
        return this.handleHttpException(exception, host);
      case 'graphql':
        throw this.handleGqlException(exception);
      default:
        this.logger.error(exception, 'Something when wrong');
        break;
    }
  }

  private handleHttpException(exception: any, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<ExpressRequest>();
    const res = host.switchToHttp().getResponse<ExpressResponse>();

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

    const errorBody: IResponseDto = {
      timestamp: new Date(),
      success: false,
      message,
      error: errorData,
    };

    const useFilter = this.cfg.get<boolean>('log.useFilter', false);
    if (useFilter && status < HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception, message);
    }

    if (exception instanceof ValidateException) {
      const validateError: IValidateError = exception.data;
      errorBody.validate = Object.entries(validateError).map(([path, messages]) => {
        return { path, messages: messages };
      });
    }

    const isProd: boolean = this.cfg.get<ENV>('env') === ENV.PROD;
    if (!isProd) {
      Object.assign(errorBody, { path: req.url, method: req.method });
      if (!isEmpty(res.locals.body)) errorBody.body = res.locals.body;
      if (!isEmpty(res.locals.query)) errorBody.query = res.locals.query;
      if (!isEmpty(res.locals.params)) errorBody.params = res.locals.params;
    }
    res.status(status).json({ ...errorBody });
  }

  private handleGqlException(exception: any): GraphQLError {
    let message: string = exception?.message || ExceptionMessage.INTERNAL_SERVER_ERROR;
    let status: number = exception?.status || ExceptionMessage.INTERNAL_SERVER_ERROR;
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
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception, exception.message);
    }

    // Hidden message in Production
    const env: ENV = this.cfg.get<ENV>('env');
    if (env === ENV.PROD) {
      data = {};
    }

    return new GraphQLError(message, { extensions: { code: status, message, data } });
  }
}
