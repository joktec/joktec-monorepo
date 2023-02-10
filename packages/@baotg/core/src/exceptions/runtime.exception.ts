import { Exception } from './exception';

export class RuntimeException<T = any> extends Exception {
  constructor(message: string, status: string, data: T = null) {
    super(message, status, data);
  }
}
