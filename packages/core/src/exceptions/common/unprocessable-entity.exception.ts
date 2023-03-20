import { HttpStatus } from '@nestjs/common';
import { RuntimeException } from '../runtime.exception';
import { ExceptionMessage } from '../exception-message';

export class UnprocessableEntityException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.INVALID_FILE_TYPE, data: T = null) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, data);
  }
}
