import { Exception } from './exception';

export class RuntimeException<T = any> extends Exception {
  constructor(message: string, status: string, error: T) {
    super(message, status, error);
  }
}
