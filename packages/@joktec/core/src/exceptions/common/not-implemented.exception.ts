import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class NotImplementedException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.NOT_IMPLEMENTED, data: T = null) {
    super(message, HttpStatus.NOT_IMPLEMENTED, data);
  }
}
