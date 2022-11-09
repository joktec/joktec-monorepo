import { RuntimeException } from './runtime.exception';
import { ExceptionStatus } from './exception-status';

export class UnsupportedMediaTypeException<T = any> extends RuntimeException {
  constructor(message: string, error: T) {
    super(message, ExceptionStatus.UNSUPPORTED_MEDIA_TYPE, error);
  }
}
