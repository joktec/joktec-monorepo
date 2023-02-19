import { RuntimeException } from '../runtime.exception';
import { ExceptionStatus } from '../exception-status';

export class BadRequestException<T = any> extends RuntimeException {
  constructor(message: string, data: T = null) {
    super(message, ExceptionStatus.BAD_REQUEST, data);
  }
}
