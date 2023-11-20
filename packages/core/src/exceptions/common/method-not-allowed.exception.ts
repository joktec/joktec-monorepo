import { HttpStatus } from '../../constants';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class MethodNotAllowedException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.METHOD_NOT_ALLOWED, data: T = null) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED, data);
  }
}
