import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class NotImplementedException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.NOT_IMPLEMENTED, error);
  }
}
