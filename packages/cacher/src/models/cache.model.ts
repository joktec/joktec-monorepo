export interface CacheModel<T> {
  conId?: string;
  namespace?: string;
  value: T;
}
