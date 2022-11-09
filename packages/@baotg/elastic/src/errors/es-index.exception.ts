import { EsException } from './es.exception';

export class EsIndexException<T> extends EsException<T> {
  constructor(msg: string, error: T) {
    super(msg, 'SOLR_INDEX_ERROR', error);
  }
}
