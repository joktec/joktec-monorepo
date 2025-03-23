import { Exception, IExceptionMessage } from './exception';

export class RuntimeException<T = any> extends Exception {
  constructor(message: IExceptionMessage, status: number, data: T = null) {
    super(message, status, data);
  }
}
