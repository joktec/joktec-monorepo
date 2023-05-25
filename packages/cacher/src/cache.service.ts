import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { isNil, isNull } from 'lodash';
import { CacheConfig, CacheType } from './cache.config';
import { CacheClient, ICacheClient } from './cache.client';
import { GetCacheMetric, SetCacheMetric } from './cache.metric';
import { CacheModel } from './models';
import { LocalService, RedisService } from './services';

const RETRY_OPTS = 'redis.retry';

@Injectable()
export class CacheService extends AbstractClientService<CacheConfig, ICacheClient> implements CacheClient {
  constructor() {
    super('redis', CacheConfig);
  }

  @Retry(RETRY_OPTS)
  async init(config: CacheConfig): Promise<ICacheClient> {
    if (config.type === CacheType.LOCAL) {
      return new LocalService(config, this.logService);
    }
    return new RedisService(config, this.logService);
  }

  async start(client: ICacheClient, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.connect();
    this.logService.info('Cache have been connected to the server.');
  }

  async stop(client: ICacheClient, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.disconnect();
    this.logService.info('Cache have been disconnected.');
  }

  @SetCacheMetric()
  async set<T>(key: string, value: T, namespace?: string, expiry?: number, conId: string = DEFAULT_CON_ID) {
    const k = namespace ? `${namespace}:${key}` : key;
    const cacheModel: CacheModel<T> = { conId, namespace, value };
    const cacheValue: string = JSON.stringify(cacheModel);
    await this.getClient(conId).setItem(k, cacheValue, expiry);
  }

  @GetCacheMetric()
  async get<T = any>(key: string, namespace?: string, conId: string = DEFAULT_CON_ID): Promise<T> {
    const k = namespace ? `${namespace}:${key}` : key;
    const value: string | null = await this.getClient(conId).getItem(k);
    if (isNull(value)) return null;
    const parseValue: CacheModel<T> = JSON.parse(value);
    return parseValue.value;
  }

  async del(key: string, namespace?: string, conId: string = DEFAULT_CON_ID) {
    const k = namespace ? `${namespace}:${key}` : key;
    try {
      await this.getClient(conId).delItem(k);
      this.logService.debug('`%s` delete a cache lookup is a success with key=%s', conId, key);
    } catch (error) {
      this.logService.error(error, '`%s` failed to delete key=%s', conId, key);
    }
  }

  async delWildcard(namespace: string, conId: string = DEFAULT_CON_ID) {
    const k = `${namespace}:*`;
    try {
      await this.getClient(conId).delItem(k);
      this.logService.debug('`%s` delete a cache lookup is a success with wildcard=`%s`', conId, k);
    } catch (error) {
      this.logService.error(error, '`%s` failed to delete wildcard=`%s`', conId, k);
    }
  }
}
