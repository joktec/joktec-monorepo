import { HttpStatus } from '../../constants';
import { IExceptionMessage } from '../exception';
import { ExceptionMessage } from '../exception-message';
import { RuntimeException } from '../runtime.exception';

export class ServiceUnavailableException<T = any> extends RuntimeException {
  constructor(message: IExceptionMessage = ExceptionMessage.SERVICE_UNAVAILABLE, data: T = null) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, data);
  }
}
