import { RuntimeException } from '../runtime.exception';
import { ExceptionStatus } from '../exception-status';

export class ServiceUnavailableException<T = any> extends RuntimeException {
  constructor(message: string, data: T = null) {
    super(message, ExceptionStatus.SERVICE_UNAVAILABLE, data);
  }
}
