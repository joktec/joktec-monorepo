import {
  CallHandler,
  Entity,
  ExecutionContext,
  Injectable,
  LogService,
  NestInterceptor,
  Reflector,
} from '@joktec/core';
import { Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CacheService } from '../cache.service';
import { CACHEABLE_WATERMARK, CacheTtlSeconds } from '../models';

export type CacheableProps = { cacheKey: string; expiry?: number; namespace?: string; conId?: string };

@Injectable()
export class CacheableInterceptor<T = Entity> implements NestInterceptor<T> {
  constructor(
    private reflector: Reflector,
    private logger: LogService,
    private cacheService: CacheService,
  ) {
    this.logger.setContext(CacheableInterceptor.name);
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    const options = this.reflector.get<CacheableProps>(CACHEABLE_WATERMARK, context.getHandler());
    if (!options) return next.handle();

    const { namespace, cacheKey, conId, expiry = CacheTtlSeconds.ONE_MINUTE } = options;
    const cachedValue: T = await this.cacheService.get<T>(cacheKey, { namespace }, conId);
    if (cachedValue) {
      this.logger.debug('`%s` Cache hit for [%s] successfully retrieved.', conId, cacheKey);
      return of(cachedValue);
    }

    return next.handle().pipe(
      tap(valueToCache => {
        if (valueToCache) {
          this.cacheService.set<T>(cacheKey, valueToCache, { namespace, expiry }, conId);
          this.logger.debug('`%s` Cache store for [%s] successfully cached.', conId, cacheKey);
        }
      }),
      catchError(error => {
        const errMsg: string = '`%s` Cache strategy error: An error occurred during the automated process for [%s].';
        this.logger.error(error, errMsg, conId, cacheKey);
        return next.handle();
      }),
    );
  }
}
