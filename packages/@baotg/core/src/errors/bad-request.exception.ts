import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class BadRequestException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.BAD_REQUEST, error);
  }
}
