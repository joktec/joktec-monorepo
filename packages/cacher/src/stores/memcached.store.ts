import { LogService } from '@joktec/core';
import { MemcacheClient } from 'memcache-client';
import { ICacheStore } from '../cache.client';
import { CacheConfig } from '../cache.config';

export class MemcachedStore implements ICacheStore {
  private readonly client: MemcacheClient;

  constructor(
    config: CacheConfig,
    private logger: LogService,
  ) {
    this.client = new MemcacheClient({
      server: {
        server: `${config.host}:${config.port}`,
        config: {
          retryFailedServerInterval: config.retryTimeout,
          failedServerOutTime: config.retryTimeout,
          keepLastServer: true,
        },
        maxConnections: config.maxConnections,
      },
      connectTimeout: config.connectTimeout,
      logger: this.logger,
    });

    this.client.on('connect', () => logger.info('Memcached is initiating a connection to the server.'));
    this.client.on('ready', () => logger.info('Memcached successfully initiated the connection to the server.'));
    this.client.on('reconnecting', () => logger.info('Memcached is trying to reconnect to the server.'));
    this.client.on('error', error => logger.error(error, 'Memcached error.'));
  }

  async connect() {
    this.logger.info('Memcached cache have been connected to the server.');
  }

  async disconnect() {
    this.client.shutdown();
    this.logger.info('Memcached cache have been stopped.');
  }

  async keys(keyPattern: string): Promise<string[]> {
    return [];
  }

  async setItem(key: string, value: string, expiry: number): Promise<any> {
    return this.client.set(key, value, { lifetime: expiry });
  }

  async getItem(key: string): Promise<string> {
    const res = await this.client.get<string>(key);
    return res.value;
  }

  async delItem(key: string): Promise<string[]> {
    return this.client.delete(key);
  }
}
