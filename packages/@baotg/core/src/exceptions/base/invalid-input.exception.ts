import { RuntimeException } from '../runtime.exception';
import { ExceptionStatus } from '../exception-status';

export class InvalidInputException<T = any> extends RuntimeException {
  constructor(message: string = 'INVALID_INPUT', status: string = ExceptionStatus.INVALID_INPUT, data: T = null) {
    super(message, status, data);
  }
}
