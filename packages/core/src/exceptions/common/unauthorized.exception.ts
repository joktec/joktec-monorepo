import { HttpStatus } from '../../models';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class UnauthorizedException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.UNAUTHORIZED, data: T = null) {
    super(message, HttpStatus.UNAUTHORIZED, data);
  }
}
