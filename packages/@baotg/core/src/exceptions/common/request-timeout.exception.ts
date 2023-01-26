import { RuntimeException } from '../runtime.exception';
import { ExceptionStatus } from '../exception-status';

export class RequestTimeoutException<T = any> extends RuntimeException {
  constructor(message: string, data: T = null) {
    super(message, ExceptionStatus.REQUEST_TIMEOUT, data);
  }
}
