import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class TooManyRequestsException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.TOO_MANY_REQUESTS, data: T = null) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, data);
  }
}
