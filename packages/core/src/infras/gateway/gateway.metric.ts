import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric, makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExpressRequest } from '../../base';
import { Exception } from '../../exceptions';
import { LogService } from '../../logger';
import { getTimeString } from '../../utils';

const ExcludePaths = ['/swagger', '/bulls', '/metrics'];
const GATEWAY_DURATION_METRIC = 'http_call_duration';
const GATEWAY_TOTAL_METRIC = 'http_call_total';

export enum GatewayStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export const gatewayDuration = makeHistogramProvider({
  name: GATEWAY_DURATION_METRIC,
  help: 'Gateway Duration By Path',
  labelNames: ['path'],
});

export const gatewayTotal = makeCounterProvider({
  name: GATEWAY_TOTAL_METRIC,
  help: `Gateway Call Total`,
  labelNames: ['path', 'status', 'statusCode', 'className'],
});

@Injectable()
export class GatewayMetric implements NestInterceptor {
  constructor(
    private logger: LogService,
    @InjectMetric(GATEWAY_DURATION_METRIC) private gatewayDurationMetric: Histogram<string>,
    @InjectMetric(GATEWAY_TOTAL_METRIC) private gatewayTotalMetric: Counter<string>,
  ) {
    this.logger.setContext(GatewayMetric.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    if (ExcludePaths.includes(request.path)) return next.handle();

    const path = `${request.method} ${request.route?.path ?? request.path}`;
    const duration = this.gatewayDurationMetric.startTimer({ path });

    return next.handle().pipe(
      tap(_ => {
        const elapsedTime = duration();
        const timeString = getTimeString(elapsedTime);
        const statusCode = context.switchToHttp().getResponse().statusCode;

        this.gatewayTotalMetric.inc({ path, status: GatewayStatus.SUCCESS, statusCode });
        this.logger.info('http: %s (%s) %s', path, timeString, statusCode);
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
          this.logger.warn('http: %s (%s) %s', path, timeString, statusCode);
        } else {
          this.logger.error('http: %s (%s) %s', path, timeString, statusCode);
        }

        return throwError(() => err);
      }),
    );
  }
}
