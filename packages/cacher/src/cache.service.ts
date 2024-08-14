import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import Redis from 'ioredis';
import { isNull } from 'lodash';
import { MemcacheClient } from 'memcache-client';
import { CacheClient, ICacheStore } from './cache.client';
import { CacheConfig, CacheType } from './cache.config';
import { DelCacheMetric, GetCacheMetric, SetCacheMetric } from './cache.metric';
import { CacheModel, CacheTtlSeconds } from './models';
import { LocalStore, MemcachedStore, RedisStore } from './stores';

const RETRY_OPTS = 'cacher.retry';

@Injectable()
export class CacheService extends AbstractClientService<CacheConfig, ICacheStore> implements CacheClient {
  constructor() {
    super('cacher', CacheConfig);
  }

  @Retry(RETRY_OPTS)
  async init(config: CacheConfig): Promise<ICacheStore> {
    if (config.type === CacheType.REDIS) return new RedisStore(config, this.logService);
    if (config.type === CacheType.MEMCACHED) return new MemcachedStore(config, this.logService);
    return new LocalStore(config, this.logService);
  }

  async start(client: ICacheStore, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.connect();
  }

  async stop(client: ICacheStore, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.disconnect();
  }

  async keys(key: string, opts?: { namespace?: string }, conId: string = DEFAULT_CON_ID): Promise<string[]> {
    const { namespace = DEFAULT_CON_ID } = opts;
    const keyPattern = namespace ? `${namespace}:${key}` : key;
    return this.getClient(conId).keys(keyPattern);
  }

  getStore(conId: string = DEFAULT_CON_ID): Redis | MemcacheClient | LocalStore {
    return this.getClient(conId).getStore();
  }

  @SetCacheMetric()
  async set<T>(key: string, value: T, opts?: { namespace?: string; expiry?: number }, conId: string = DEFAULT_CON_ID) {
    const { namespace = DEFAULT_CON_ID, expiry = CacheTtlSeconds.ONE_MINUTE } = opts;
    const keyPattern = namespace ? `${namespace}:${key}` : key;
    const cacheModel: CacheModel<T> = { conId, namespace, value };
    const cacheValue: string = JSON.stringify(cacheModel);
    await this.getClient(conId).setItem(keyPattern, cacheValue, expiry);
  }

  @GetCacheMetric()
  async get<T = any>(key: string, opts?: { namespace?: string }, conId: string = DEFAULT_CON_ID): Promise<T> {
    const { namespace = DEFAULT_CON_ID } = opts;
    const keyPattern = namespace ? `${namespace}:${key}` : key;
    const value: string | null = await this.getClient(conId).getItem(keyPattern);
    if (isNull(value)) return null;
    const parseValue: CacheModel<T> = JSON.parse(value);
    return parseValue.value;
  }

  @DelCacheMetric()
  async del(key: string, opts?: { namespace?: string }, conId: string = DEFAULT_CON_ID): Promise<string[]> {
    const { namespace = DEFAULT_CON_ID } = opts;
    const keyPattern = namespace ? `${namespace}:${key}` : key;
    return this.getClient(conId).delItem(keyPattern);
  }
}
