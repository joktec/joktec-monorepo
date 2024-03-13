import { HttpStatus } from '../../models';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class BadRequestException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.BAD_REQUEST, data: T = null) {
    super(message, HttpStatus.BAD_REQUEST, data);
  }
}
