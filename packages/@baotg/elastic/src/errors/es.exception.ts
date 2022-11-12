import { RuntimeException } from '@baotg/core';

export class EsException<T> extends RuntimeException {
  constructor(msg: string, status: string, error: T) {
    super(msg, status, error);
  }
}
