import path from 'path';
import { LogService } from '@joktec/core';
import storage, { LocalStorage } from 'node-persist';
import { ICacheStore } from '../cache.client';
import { CacheConfig } from '../cache.config';
import { wildcardToRegExp } from '../cache.utils';

export class LocalStore implements ICacheStore {
  private client: LocalStorage;

  constructor(
    config: CacheConfig,
    private logger: LogService,
  ) {
    const cacheDir = config.cacheDir || 'cache';
    this.client = storage.create({
      dir: path.posix.join(cacheDir, config.conId),
      logging: (...args: any[]) => this.logger.info(args, `Local logger init`),
    });
  }

  async connect() {
    await this.client.init();
    this.logger.info('Local cache have been connected to the server.');
  }

  async disconnect() {
    this.logger.info('Local cache have been stopped.');
  }

  getStore(): LocalStorage {
    return this.client;
  }

  async keys(keyPattern: string): Promise<string[]> {
    const regex = wildcardToRegExp(keyPattern);
    const keys = await this.client.keys();
    return keys.filter(k => regex.test(k) || k === keyPattern);
  }

  async setItem(key: string, value: string, expiry: number): Promise<any> {
    await this.client.set(key, value, { ttl: expiry * 1000 });
  }

  async getItem(key: string): Promise<string> {
    return this.client.get(key);
  }

  async delItem(key: string): Promise<string[]> {
    const keys = await this.keys(key);
    await Promise.all(keys.map(k => this.client.del(k)));
    return keys;
  }
}
