import { HttpStatus } from '../../constants';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class UnprocessableEntityException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.INVALID_FILE_TYPE, data: T = null) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, data);
  }
}
