import { HttpStatus } from '@nestjs/common';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class BadRequestException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.BAD_REQUEST, data: T = null) {
    super(message, HttpStatus.BAD_REQUEST, data);
  }
}
