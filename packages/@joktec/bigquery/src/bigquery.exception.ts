import { RuntimeException } from '@joktec/core';

export class BigQueryException<T> extends RuntimeException {
  constructor(message: string, status: string = 'BIG_QUERY_EXCEPTION', error?: T) {
    super(message, status, null);
  }
}
