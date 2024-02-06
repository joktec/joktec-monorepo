import { HttpStatus } from '../../constants';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class ForbiddenException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.FORBIDDEN, data: T = null) {
    super(message, HttpStatus.FORBIDDEN, data);
  }
}
