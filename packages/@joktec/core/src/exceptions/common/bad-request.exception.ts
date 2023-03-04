import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class BadRequestException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.BAD_REQUEST, data: T = null) {
    super(message, HttpStatus.BAD_REQUEST, data);
  }
}
