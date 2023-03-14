import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class ForbiddenException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.FORBIDDEN, data: T = null) {
    super(message, HttpStatus.FORBIDDEN, data);
  }
}
