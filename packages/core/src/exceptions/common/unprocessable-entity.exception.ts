import { HttpStatus } from '@nestjs/common';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class UnprocessableEntityException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.INVALID_FILE_TYPE, data: T = null) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, data);
  }
}
