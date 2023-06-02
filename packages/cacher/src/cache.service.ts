import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { isNull } from 'lodash';
import { CacheConfig, CacheType } from './cache.config';
import { CacheClient, ICacheClient } from './cache.client';
import { DelCacheMetric, GetCacheMetric, SetCacheMetric } from './cache.metric';
import { CacheModel, CacheTtlSeconds } from './models';
import { LocalService, MemcachedService, RedisService } from './services';

const RETRY_OPTS = 'cacher.retry';

@Injectable()
export class CacheService extends AbstractClientService<CacheConfig, ICacheClient> implements CacheClient {
  constructor() {
    super('cacher', CacheConfig);
  }

  @Retry(RETRY_OPTS)
  async init(config: CacheConfig): Promise<ICacheClient> {
    if (config.type === CacheType.REDIS) return new RedisService(config, this.logService);
    if (config.type === CacheType.MEMCACHED) return new MemcachedService(config, this.logService);
    return new LocalService(config, this.logService);
  }

  async start(client: ICacheClient, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.connect();
  }

  async stop(client: ICacheClient, conId: string = DEFAULT_CON_ID): Promise<void> {
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
