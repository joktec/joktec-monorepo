import { RuntimeException } from '../runtime.exception';
import { ExceptionStatus } from '../exception-status';

export class InvalidPayloadException<T = any> extends RuntimeException {
  constructor(message: string = 'INVALID_PAYLOAD', status: number = ExceptionStatus.INVALID_PAYLOAD, data: T = null) {
    super(message, status, data);
  }
}
