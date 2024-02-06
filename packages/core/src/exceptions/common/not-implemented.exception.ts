import { HttpStatus } from '../../constants';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class NotImplementedException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.NOT_IMPLEMENTED, data: T = null) {
    super(message, HttpStatus.NOT_IMPLEMENTED, data);
  }
}
