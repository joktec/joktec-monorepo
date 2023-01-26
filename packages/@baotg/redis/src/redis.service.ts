import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@baotg/core';
import Redis from 'ioredis';
import { isNull, isNil } from 'lodash';
import { RedisConfig } from './redis.config';
import { RedisClient } from './redis.client';
import { GetRedisMetric, SetRedisMetric } from './redis.metric';
import { RedisModel } from './models';

const RETRY_OPTS = 'redis.retry';

@Injectable()
export class RedisService extends AbstractClientService<RedisConfig, Redis> implements RedisClient {
  constructor() {
    super('redis', RedisConfig);
  }

  @Retry(RETRY_OPTS)
  async init(config: RedisConfig): Promise<Redis> {
    const redis = new Redis({ ...config, db: config.database, readOnly: config.readonly });
    redis.on('connect', () => this.logService.info('Redis is initiating a connection to the server.'));
    redis.on('ready', () => this.logService.info('Redis successfully initiated the connection to the server.'));
    redis.on('reconnecting', () => this.logService.info('Redis is trying to reconnect to the server.'));
    redis.on('error', error => this.logService.error(error, 'Redis error.'));
    return redis;
  }

  async start(client: Redis, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.connect();
    this.logService.info('Redis have been connected to the server.');
  }

  async stop(client: Redis, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.disconnect(false);
    this.logService.info('Redis have been disconnected.');
  }

  @SetRedisMetric()
  async set<T>(key: string, value: T, namespace?: string, expiry?: number, conId: string = DEFAULT_CON_ID) {
    const k = namespace ? `${namespace}:${key}` : key;
    const cacheModel: RedisModel<T> = { conId, namespace, value };
    const cacheValue: string = JSON.stringify(cacheModel);
    await this.getClient(conId).set(k, cacheValue, 'EX', expiry);
  }

  @GetRedisMetric()
  async get<T = any>(key: string, namespace?: string, conId: string = DEFAULT_CON_ID): Promise<T> {
    const k = namespace ? `${namespace}:${key}` : key;
    const value: string | null = await this.getClient(conId).get(k);
    if (isNull(value)) return null;
    const parseValue: RedisModel<T> = JSON.parse(value);
    return parseValue.value;
  }

  async del(key: string, namespace?: string, conId: string = DEFAULT_CON_ID) {
    const k = namespace ? `${namespace}:${key}` : key;
    try {
      await this.getClient(conId).del(k);
      this.logService.debug('`%s` delete a cache lookup is a success with key=%s', conId, key);
    } catch (error) {
      this.logService.error(error, '`%s` failed to delete key=%s', conId, key);
    }
  }

  async delWildcard(namespace: string, conId: string = DEFAULT_CON_ID) {
    const k = `${namespace}:*`;
    try {
      await this.getClient(conId).del(k);
      this.logService.debug('`%s` delete a cache lookup is a success with wildcard=`%s`', conId, k);
    } catch (error) {
      this.logService.error(error, '`%s` failed to delete wildcard=`%s`', conId, k);
    }
  }

  async getCachedValue<T>(
    key: string,
    valueCallback: () => Promise<T>,
    config?: { namespace?: string; expiry?: number },
    conId: string = DEFAULT_CON_ID,
  ): Promise<T> {
    const cachedValue: T = await this.get<T>(key, config?.namespace, conId);
    if (isNil(cachedValue)) {
      return cachedValue;
    }

    const valueToCache = await valueCallback();
    await this.set(key, valueToCache, config?.namespace, config?.expiry, conId);
    return valueToCache;
  }
}
