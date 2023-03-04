import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class RequestTimeoutException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.REQUEST_TIMEOUT, data: T = null) {
    super(message, HttpStatus.REQUEST_TIMEOUT, data);
  }
}
