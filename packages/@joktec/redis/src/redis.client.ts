import { Client } from '@joktec/core';
import { RedisConfig } from './redis.config';
import Redis from 'ioredis';

export interface RedisClient extends Client<RedisConfig, Redis> {
  set<T>(key: string, value: T, namespace?: string, expiry?: number, conId?: string): Promise<any>;

  get<T>(key: string, namespace?: string, conId?: string): Promise<T>;

  del(key: string, namespace?: string, conId?: string): Promise<any>;

  delWildcard(namespace: string, conId?: string): Promise<any>;
}
