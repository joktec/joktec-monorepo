import { Clazz } from '@joktec/core';

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
  ONE_MONTH = 30 * 60 * 60 * 24,
  ONE_QUARTER = 90 * 60 * 60 * 24,
  ONE_YEAR = 365 * 60 * 60 * 24,
}

export interface CacheableOption {
  key?: string;
  expiry?: number;
  conId?: string;
  transform?: Clazz;
}

export interface CacheEvictOption {
  key?: string;
  allEntries?: boolean;
  conId?: string;
}

export const CACHEABLE_WATERMARK = '__cacheable__';
