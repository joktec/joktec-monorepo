import { HttpStatus } from '../../constants';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class RequestTimeoutException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.REQUEST_TIMEOUT, data: T = null) {
    super(message, HttpStatus.REQUEST_TIMEOUT, data);
  }
}
