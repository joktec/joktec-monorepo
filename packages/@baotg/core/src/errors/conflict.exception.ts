import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class ConflictException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.CONFLICT, error);
  }
}
