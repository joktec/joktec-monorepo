import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class UnprocessableEntityException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.UNPROCESSABLE_ENTITY, error);
  }
}
