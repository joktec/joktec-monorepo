import { EsException } from './es.exception';

export class EsSearchException<T> extends EsException<T> {
  constructor(msg: string, error: T) {
    super(msg, 'SOLR_SEARCH_ERROR', error);
  }
}
