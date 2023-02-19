import { RuntimeException } from '../runtime.exception';
import { ExceptionStatus } from '../exception-status';

export class InternalServerException<T = any> extends RuntimeException {
  constructor(message: string, data: T = null) {
    super(message, ExceptionStatus.INTERNAL_SERVER_ERROR, data);
  }
}
