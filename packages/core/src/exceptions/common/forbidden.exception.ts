import { HttpStatus } from '../../constants';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class ForbiddenException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.FORBIDDEN, data: T = null) {
    super(message, HttpStatus.FORBIDDEN, data);
  }
}
