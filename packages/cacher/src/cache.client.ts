import { Client } from '@joktec/core';
import { CacheConfig } from './cache.config';

export interface ICacheClient {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  setItem(key: string, value: string, expiry?: number): Promise<any>;

  getItem(key: string): Promise<string>;

  delItem(key: string): Promise<any>;
}

export interface CacheClient extends Client<CacheConfig, ICacheClient> {
  set<T>(key: string, value: T, namespace?: string, expiry?: number, conId?: string): Promise<any>;

  get<T>(key: string, namespace?: string, conId?: string): Promise<T>;

  del(key: string, namespace?: string, conId?: string): Promise<any>;

  delWildcard(namespace: string, conId?: string): Promise<any>;
}
