import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class NotFoundException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.NOT_FOUND, data: T = null) {
    super(message, HttpStatus.NOT_FOUND, data);
  }
}
