import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConfigService,
  ENV,
  Exception,
  ExceptionFilter,
  ExceptionMessage,
  ForbiddenException,
  HttpStatus,
  InternalServerException,
  IResponseDto,
  IValidateError,
  LogService,
  NotFoundException,
  NotImplementedException,
  toBool,
  UnauthorizedException,
  ValidateException,
} from '@joktec/core';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { ExceptionCode } from './exception.code';

export interface ResponseDto extends IResponseDto {
  validate?: Array<{ path: string; messages: string[] }>;
}

@Catch(Exception)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private cfg: ConfigService,
    private logger: LogService,
  ) {
    this.logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: Exception, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status: number = exception?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message: string = exception?.message || ExceptionMessage.INTERNAL_SERVER_ERROR;

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception, 'Something when wrong');
    }

    const useFilter = toBool(this.cfg.get<boolean>('log.useFilter'), false);
    if (useFilter && status < HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception, message);
    }

    const errorBody: ResponseDto = {
      timestamp: new Date(),
      success: false,
      errorCode: this.getErrorCode(exception),
      message,
    };

    if (exception instanceof ValidateException) {
      const validateError: IValidateError = exception.data;
      errorBody.validate = Object.entries(validateError).map(([path, messages]) => {
        return { path, messages: messages };
      });
    }

    const isProd: boolean = this.cfg.get<ENV>('env') === ENV.PROD;
    if (!isProd) {
      const errorData: any = exception?.data || exception.stack;
      Object.assign(errorBody, {
        error: errorBody.validate ? exception.stack : errorData,
        path: request.url,
        method: request.method,
      });
      if (!isEmpty(request.body)) errorBody.body = request.body;
      if (!isEmpty(request.query)) errorBody.query = request.query;
      if (!isEmpty(request['originQuery'])) errorBody.query = request['originQuery'];
      if (!isEmpty(request.params)) errorBody.params = request.params;
    }

    response.status(status).json(errorBody);
  }

  private getErrorCode(exception: Exception): ExceptionCode {
    if (exception instanceof ValidateException) return ExceptionCode.INVALID_INPUT;
    if (exception instanceof BadRequestException) {
      if (!exception?.message) return ExceptionCode.UNDEFINED;
      return ExceptionCode[exception.message] || ExceptionCode.UNDEFINED;
    }
    if (exception instanceof UnauthorizedException) return ExceptionCode.JWT_EXCEPTION;
    if (exception instanceof ForbiddenException) return ExceptionCode.FORBIDDEN;
    if (exception instanceof NotFoundException) return ExceptionCode.NOT_FOUND;
    if (exception instanceof InternalServerException) return ExceptionCode.SYSTEM_ERROR;
    if (exception instanceof NotImplementedException) return ExceptionCode.NOT_IMPLEMENTED;
    return ExceptionCode.UNDEFINED;
  }
}
