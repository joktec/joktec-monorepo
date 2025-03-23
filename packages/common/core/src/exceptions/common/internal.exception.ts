import { HttpStatus } from '@joktec/utils';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class InternalServerException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.INTERNAL_SERVER_ERROR, data: T = null) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, data);
  }
}
