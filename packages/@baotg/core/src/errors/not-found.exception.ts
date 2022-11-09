import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class NotFoundException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.NOT_FOUND, error);
  }
}
