import { HttpStatus } from '../../constants';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class NotFoundException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.NOT_FOUND, data: T = null) {
    super(message, HttpStatus.NOT_FOUND, data);
  }
}
