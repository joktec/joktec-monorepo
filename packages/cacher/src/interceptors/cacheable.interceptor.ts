import { CallHandler, Entity, ExecutionContext, Injectable, NestInterceptor, Reflector } from '@joktec/core';
import { Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CacheService } from '../cache.service';
import { CACHEABLE_WATERMARK, CacheTtlSeconds } from '../models';

export type CacheableProps = { cacheKey: string; expiry?: number; namespace?: string; conId?: string };

@Injectable()
export class CacheableInterceptor<T = Entity> implements NestInterceptor<T> {
  constructor(
    private reflector: Reflector,
    private cacheService: CacheService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<T>> {
    const options = this.reflector.get<CacheableProps>(CACHEABLE_WATERMARK, context.getHandler());
    if (!options) return next.handle();

    const { namespace, cacheKey, conId, expiry = CacheTtlSeconds.ONE_MINUTE } = options;
    const cachedValue: T = await this.cacheService.get<T>(cacheKey, { namespace }, conId);
    if (cachedValue) {
      return of(cachedValue);
    }

    return next.handle().pipe(
      tap(value => this.cacheService.set<T>(cacheKey, value, { namespace, expiry }, conId)),
      catchError(_ => next.handle()),
    );
  }
}
