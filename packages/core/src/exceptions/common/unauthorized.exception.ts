import { HttpStatus } from '../../constants';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class UnauthorizedException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.UNAUTHORIZED, data: T = null) {
    super(message, HttpStatus.UNAUTHORIZED, data);
  }
}
