import { HttpStatus } from '../../constants';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class NotFoundException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.NOT_FOUND, data: T = null) {
    super(message, HttpStatus.NOT_FOUND, data);
  }
}
