import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class UnauthorizedException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.UNAUTHORIZED, error);
  }
}
