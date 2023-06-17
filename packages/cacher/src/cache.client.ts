import { Client } from '@joktec/core';
import { CacheConfig } from './cache.config';

export interface ICacheStore {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  setItem(key: string, value: string, expiry?: number): Promise<any>;

  getItem(key: string): Promise<string>;

  delItem(key: string): Promise<boolean>;
}

export interface CacheClient extends Client<CacheConfig, ICacheStore> {
  set<T>(key: string, value: T, opts?: { namespace?: string; expiry?: number }, conId?: string): Promise<any>;

  get<T>(key: string, opts?: { namespace?: string }, conId?: string): Promise<T>;

  del(key: string, opts?: { namespace?: string }, conId?: string): Promise<any>;
}
