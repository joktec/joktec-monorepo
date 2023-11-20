import { applyDecorators, HttpCode as NestHttpCode, SetMetadata } from '@nestjs/common';
import { HttpStatus } from '../constants';

export const RESPONSE_MESSAGE_KEY = 'http:response_message';
export const SUCCESS_STATUS_KEY = 'http:success_status';
export const HttpResponse = (
  status: number | HttpStatus = HttpStatus.OK,
  message: string = 'SUCCESS',
): MethodDecorator =>
  applyDecorators(
    NestHttpCode(status),
    SetMetadata<string, number | HttpStatus>(SUCCESS_STATUS_KEY, status),
    SetMetadata<string, string>(RESPONSE_MESSAGE_KEY, message),
  );
