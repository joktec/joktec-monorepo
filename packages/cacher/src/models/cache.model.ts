export interface CacheModel<T> {
  conId?: string;
  namespace?: string;
  value: T;
}

export enum CacheTtlSeconds {
  FOREVER = 0,
  ONE_MINUTE = 60,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 7 * 24 * 60 * 60,
}
