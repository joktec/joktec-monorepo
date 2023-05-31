import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class MethodNotAllowedException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.METHOD_NOT_ALLOWED, data: T = null) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED, data);
  }
}
