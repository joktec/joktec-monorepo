import { RuntimeException } from '@joktec/core';

export class ArangoException<T> extends RuntimeException {
  constructor(msg: string, status: string, error: T) {
    super(msg, status, error);
  }
}

export class ArangoImportException<T> extends ArangoException<T> {
  constructor(msg: string, error: T) {
    super(msg, 'ARANGO_IMPORT_EXCEPTION', error);
  }
}

export class ArangoMutationException<T> extends ArangoException<T> {
  constructor(msg: string, error: T) {
    super(msg, 'ARANGO_MUTATION_EXCEPTION', error);
  }
}

export class ArangoQueryException<T> extends ArangoException<T> {
  constructor(msg: string, error: T) {
    super(msg, 'ARANGO_QUERY_EXCEPTION', error);
  }
}
