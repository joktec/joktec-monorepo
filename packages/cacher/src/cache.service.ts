import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { isNull } from 'lodash';
import { CacheConfig, CacheType } from './cache.config';
import { CacheClient, ICacheStore } from './cache.client';
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

  @SetCacheMetric()
  async set<T>(key: string, value: T, opts?: { namespace?: string; expiry?: number }, conId: string = DEFAULT_CON_ID) {
    const { namespace = DEFAULT_CON_ID, expiry = CacheTtlSeconds.ONE_DAY } = opts;
    const k = namespace ? `${namespace}:${key}` : key;
    const cacheModel: CacheModel<T> = { conId, namespace, value };
    const cacheValue: string = JSON.stringify(cacheModel);
    await this.getClient(conId).setItem(k, cacheValue, expiry);
  }

  @GetCacheMetric()
  async get<T = any>(key: string, opts?: { namespace?: string }, conId: string = DEFAULT_CON_ID): Promise<T> {
    const { namespace = DEFAULT_CON_ID } = opts;
    const k = namespace ? `${namespace}:${key}` : key;
    const value: string | null = await this.getClient(conId).getItem(k);
    if (isNull(value)) return null;
    const parseValue: CacheModel<T> = JSON.parse(value);
    return parseValue.value;
  }

  @DelCacheMetric()
  async del(key: string, opts?: { namespace?: string }, conId: string = DEFAULT_CON_ID): Promise<any> {
    const { namespace = DEFAULT_CON_ID } = opts;
    const k = namespace ? `${namespace}:${key}` : key;
    await this.getClient(conId).delItem(k);
  }
}
