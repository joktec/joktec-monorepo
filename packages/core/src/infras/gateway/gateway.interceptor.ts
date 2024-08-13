import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Exception } from '../../exceptions';
import { ExpressRequest, HttpStatus } from '../../models';
import { LogService } from '../../modules';
import { getTimeString } from '../../utils';
import { GATEWAY_DURATION_METRIC, GATEWAY_TOTAL_METRIC, GatewayStatus } from './gateway.metric';

@Injectable()
export class GatewayMetricInterceptor implements NestInterceptor {
  constructor(
    private logger: LogService,
    @InjectMetric(GATEWAY_DURATION_METRIC) private gatewayDurationMetric: Histogram<string>,
    @InjectMetric(GATEWAY_TOTAL_METRIC) private gatewayTotalMetric: Counter<string>,
  ) {
    this.logger.setContext(GatewayMetricInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const { method, baseUrl, path, originalUrl } = request;
    if (originalUrl === '/health' || originalUrl === '/metric') {
      return next.handle().pipe();
    }

    const metricPath = `${method} ${baseUrl + path}`;
    const duration = this.gatewayDurationMetric.startTimer({ metricPath });

    return next.handle().pipe(
      tap(_ => {
        const elapsedTime = duration();
        const timeString = getTimeString(elapsedTime);
        const statusCode = context.switchToHttp().getResponse().statusCode;

        this.gatewayTotalMetric.inc({ path: metricPath, status: GatewayStatus.SUCCESS, statusCode });
        this.logger.info('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
      }),
      catchError(err => {
        const elapsedTime = duration();
        const timeString = getTimeString(elapsedTime);
        let statusCode = context.switchToHttp().getResponse().statusCode;

        if (err instanceof Exception) statusCode = err.status;

        let className: string = 'Unknown';
        try {
          const stack = err.stack?.split(/\r\n|\r|\n/);
          className = stack[1].split(/\b(\s)/)[2];
        } catch (error) {
          this.logger.debug('Error to get className');
        }

        this.gatewayTotalMetric.inc({ path, status: GatewayStatus.FAILED, statusCode, className });
        if (statusCode >= HttpStatus.BAD_REQUEST && statusCode < HttpStatus.INTERNAL_SERVER_ERROR) {
          this.logger.warn('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
        } else {
          this.logger.error('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
        }

        return throwError(() => err);
      }),
    );
  }
}
