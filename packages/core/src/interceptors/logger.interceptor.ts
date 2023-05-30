import { Reflector } from '@nestjs/core';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { RENDER_METADATA } from '@nestjs/common/constants';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { LogService } from '../log';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, private logger: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const elapsedTime = end - start;
        let timeString = `${elapsedTime} ms`;
        if (elapsedTime >= 1500) {
          timeString = `${(elapsedTime / 1000).toFixed(2)} s`;
        }

        const method = req.method.toUpperCase();
        const path = req.originalUrl;
        const status = context.switchToHttp().getResponse().statusCode;

        const renderView = this.reflector.get<string>(RENDER_METADATA, context.getHandler());
        if (renderView) {
          this.logger.info('http: %s - %s (%s) %s - View: %s', method, path, timeString, status, renderView);
        } else {
          this.logger.info('http: %s - %s (%s) %s', method, path, timeString, status);
        }
      }),
    );
  }
}
