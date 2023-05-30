import { Reflector } from '@nestjs/core';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
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
        const timeString = this.getTimeString(start);
        const method = req.method.toUpperCase();
        const path = req.originalUrl;
        const status = context.switchToHttp().getResponse().statusCode;
        if (status >= HttpStatus.OK && status < HttpStatus.BAD_REQUEST) {
          this.logger.info('http: %s - %s (%s) %s', method, path, timeString, status);
        } else {
          this.logger.warn('http: %s - %s (%s) %s', method, path, timeString, status);
        }
      }),
      catchError(error => {
        const timeString = this.getTimeString(start);
        const method = req.method.toUpperCase();
        const path = req.originalUrl;
        const status = context.switchToHttp().getResponse().statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

        if (status >= HttpStatus.BAD_REQUEST && status < HttpStatus.INTERNAL_SERVER_ERROR) {
          this.logger.warn('http: %s - %s (%s) %s', method, path, timeString, status);
        } else {
          this.logger.error('http: %s - %s (%s) %s', method, path, timeString, status);
        }

        return throwError(error);
      }),
    );
  }

  private getTimeString(start: number): string {
    const end = Date.now();
    const elapsedTime = end - start;
    let timeString = `${elapsedTime} ms`;
    if (elapsedTime >= 1500) {
      timeString = `${(elapsedTime / 1000).toFixed(2)} s`;
    }
    return timeString;
  }
}
