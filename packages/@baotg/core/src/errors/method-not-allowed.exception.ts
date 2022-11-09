import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class MethodNotAllowedException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.METHOD_NOT_ALLOWED, error);
  }
}
