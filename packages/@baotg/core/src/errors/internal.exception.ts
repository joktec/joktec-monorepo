import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class InternalServerException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.INTERNAL_SERVER_ERROR, error);
  }
}
