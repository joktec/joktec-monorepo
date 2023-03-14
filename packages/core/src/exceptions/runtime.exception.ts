import { Exception } from './exception';

export class RuntimeException<T = any> extends Exception {
  constructor(message: string, status: number, data: T = null) {
    super(message, status, data);
  }
}
