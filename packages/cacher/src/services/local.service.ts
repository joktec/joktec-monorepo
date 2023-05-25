import { LogService } from '@joktec/core';
import { ICacheClient } from '../cache.client';
import { CacheConfig } from '../cache.config';
import storage, { LocalStorage } from 'node-persist';
import path from 'path';

export class LocalService implements ICacheClient {
  private client: LocalStorage;

  constructor(config: CacheConfig, private logger: LogService) {
    const cacheDir = config.cacheDir || 'cache';
    this.client = storage.create({
      dir: path.posix.join(cacheDir, config.conId),
      logging: (...args: any[]) => this.logger.info(`Local logger: %j`, args),
    });
  }

  async connect() {
    await this.client.init();
  }

  async disconnect() {}

  async setItem(key: string, value: string, expiry?: number): Promise<any> {
    await this.client.set(key, value, { ttl: expiry });
  }

  async getItem(key: string): Promise<string> {
    return this.client.get(key);
  }

  async delItem(key: string): Promise<any> {
    await this.client.del(key);
  }
}
