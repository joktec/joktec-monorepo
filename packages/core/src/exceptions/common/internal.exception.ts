import { HttpStatus } from '../../constants';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class InternalServerException<T = any> extends RuntimeException {
  constructor(message: string = ExceptionMessage.INTERNAL_SERVER_ERROR, data: T = null) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, data);
  }
}
