import { RuntimeException } from '../runtime.exception';
import { ExceptionStatus } from '../exception-status';

export class TooManyRequestsException<T = any> extends RuntimeException {
  constructor(message: string, data: T = null) {
    super(message, ExceptionStatus.TOO_MANY_REQUESTS, data);
  }
}
