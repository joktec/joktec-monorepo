import { HttpStatus } from '../../constants';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class MethodNotAllowedException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.METHOD_NOT_ALLOWED, data: T = null) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED, data);
  }
}
