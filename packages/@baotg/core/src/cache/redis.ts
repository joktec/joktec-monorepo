import { Injectable, OnModuleInit } from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';
import { useIoRedisAdapter } from 'type-cacheable';

/*
This enum just makes it easy to set cache ttls. Type cacheable uses
seconds.
*/
export enum CacheTtlSeconds {
  ONE_MINUTE = 60,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 7 * 24 * 60 * 60,
}

/*
This is just a generic exception we can throw and easily detect later in our app,
 in logs or other systems.
*/
export class NotCacheableException<T> extends Error {
  public constructor(message: string) {
    super(message);
  }
}

/*
This class maps env variables to a redis io config object
*/
@Injectable()
export class RedisCacheConfigurationMapper {
  public static map(): RedisOptions {
    return {
      lazyConnect: true,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      connectTimeout: Number(process.env.REDIS_TIMEOUT),
      tls: process.env.REDIS_USETLS === 'true' ? {} : undefined,
    };
  }
}

/*
This is where we setup the typecacheable store. We use Nest's OnModuleInit
interface to have the setup run immediately.
This allows us to stop application start if there is a problem
configuring our redis instance.
*/
@Injectable()
export class RedisCacheService implements OnModuleInit {
  private redisInstance: Redis | undefined;

  public async onModuleInit(): Promise<void> {
    try {
      if (this.isAlreadyConfigured()) {
        return;
      }

      this.redisInstance = new IORedis(RedisCacheConfigurationMapper.map());
      // we set up error events. Note that we don't want to
      // stop the application on connection errors. We don't want the lack
      // of a working cache to break our application. You need to think
      // about if this is the correct approach for your application.
      this.redisInstance.on('error', (e: Error) => {
        this.handleError(e);
      });
      // This is where we configure type cachable to use this redis instance
      useIoRedisAdapter(this.redisInstance);
      // and finally we open the connection
      await this.redisInstance?.connect();
    } catch (e) {
      this.handleError(e as Error);
    }
  }

  private handleError(e: Error): void {
    console.error('Could not connect to Redis cache instance', e);
  }

  private isAlreadyConfigured(): boolean {
    return this.redisInstance !== undefined;
  }
}

/**
 * Generate key redis by params
 */

export const generateRedisCacheKey = (prefix: string, args: any[]) => {
  let params: any = {};
  args.map(arg => (params = { ...params, ...arg }));
  const sorted = Object.keys(params)
    .sort()
    .reduce((obj: any, key: string) => {
      obj[key] = params[key];
      return obj;
    }, {});
  return `${prefix}_${JSON.stringify(sorted)}`;
};
