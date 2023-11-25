import { LogService, toBool, toInt } from '@joktec/core';
import Redis from 'ioredis';
import { ICacheStore } from '../cache.client';
import { CacheConfig } from '../cache.config';

export class RedisStore implements ICacheStore {
  private readonly client: Redis;

  constructor(
    config: CacheConfig,
    private logger: LogService,
  ) {
    this.client = new Redis({
      ...config,
      host: config.host || 'localhost',
      port: toInt(config.port, 6379),
      db: config.database,
      readOnly: toBool(config.readonly, false),
    });

    this.client.on('connect', () => logger.info('Redis is initiating a connection to the server.'));
    this.client.on('ready', () => logger.info('Redis successfully initiated the connection to the server.'));
    this.client.on('reconnecting', () => logger.info('Redis is trying to reconnect to the server.'));
    this.client.on('error', error => logger.error(error, 'Redis error.'));
  }

  async connect() {
    await this.client.connect();
    this.logger.info('Redis cache have been connected to the server.');
  }

  async disconnect() {
    this.client.disconnect(false);
    this.logger.info('Redis cache have been stopped.');
  }

  async setItem(key: string, value: string, expiry: number): Promise<any> {
    await this.client.set(key, value, 'EX', expiry);
  }

  async getItem(key: string): Promise<string> {
    return this.client.get(key);
  }

  async delItem(key: string): Promise<boolean> {
    await this.client.del(key);
    return true;
  }
}
