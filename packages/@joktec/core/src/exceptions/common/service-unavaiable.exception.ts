import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class ServiceUnavailableException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.SERVICE_UNAVAILABLE, data: T = null) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, data);
  }
}
