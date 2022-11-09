import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class RequestTimeoutException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.REQUEST_TIMEOUT, error);
  }
}
