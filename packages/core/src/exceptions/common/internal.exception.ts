import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class InternalServerException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.INTERNAL_SERVER_ERROR, data: T = null) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, data);
  }
}
