export interface ArangoDocument {
  [doc: string]: any;

  _key: string;
  _from?: string;
  _to?: string;
}
