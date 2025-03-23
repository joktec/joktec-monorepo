import { HttpStatus } from '@joktec/utils';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class TooManyRequestsException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.TOO_MANY_REQUESTS, data: T = null) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, data);
  }
}
