import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class UnauthorizedException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.UNAUTHORIZED, data: T = null) {
    super(message, HttpStatus.UNAUTHORIZED, data);
  }
}
