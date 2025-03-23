import { getTimeString, HttpStatus } from '@joktec/utils';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Exception } from '../../exceptions';
import { ExpressRequest } from '../../models';
import { LogService } from '../../modules';
import { GATEWAY_DURATION_METRIC, GATEWAY_TOTAL_METRIC, GatewayStatus } from './gateway.metric';

@Injectable()
export class GatewayMetricInterceptor implements NestInterceptor {
  constructor(
    private logService: LogService,
    @InjectMetric(GATEWAY_DURATION_METRIC) private gatewayDurationMetric: Histogram<string>,
    @InjectMetric(GATEWAY_TOTAL_METRIC) private gatewayTotalMetric: Counter<string>,
  ) {
    this.logService.setContext(GatewayMetricInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const skipPath = ['/health', '/metrics', '/bulls', '/swagger', '/swagger-json', '/favicon.ico'];
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const { method, baseUrl, path, originalUrl } = request;
    if (skipPath.includes(originalUrl)) {
      return next.handle().pipe();
    }

    const metricPath = `${method} ${baseUrl + path}`;
    const duration = this.gatewayDurationMetric.startTimer({ metricPath });

    return next.handle().pipe(
      tap(_ => {
        const elapsedTime = duration() * 1000.0;
        const timeString = getTimeString(elapsedTime);
        const statusCode = context.switchToHttp().getResponse().statusCode;

        this.gatewayTotalMetric.inc({ path: metricPath, status: GatewayStatus.SUCCESS, statusCode });
        this.logService.info('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
      }),
      catchError(err => {
        const elapsedTime = duration() * 1000.0;
        const timeString = getTimeString(elapsedTime);
        let statusCode = context.switchToHttp().getResponse().statusCode;

        if (err instanceof Exception) statusCode = err.status;

        let className: string = 'Unknown';
        try {
          const stack = err.stack?.split(/\r\n|\r|\n/);
          className = stack[1].split(/\b(\s)/)[2];
        } catch (error) {
          this.logService.debug('Error to get className');
        }

        this.gatewayTotalMetric.inc({ path, status: GatewayStatus.FAILED, statusCode, className });
        if (statusCode >= HttpStatus.BAD_REQUEST && statusCode < HttpStatus.INTERNAL_SERVER_ERROR) {
          this.logService.warn('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
        } else {
          this.logService.error('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
        }

        return throwError(() => err);
      }),
    );
  }
}
