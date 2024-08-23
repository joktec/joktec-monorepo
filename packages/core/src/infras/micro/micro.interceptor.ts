import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge } from 'prom-client';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from '../../modules';
import { getTimeString } from '../../utils';
import { MICRO_LATENCY_METRIC, MICRO_TOTAL_METRIC, MicroStatus } from './micro.metric';

@Injectable()
export class MicroMetricInterceptor implements NestInterceptor {
  constructor(
    private logService: LogService,
    @InjectMetric(MICRO_LATENCY_METRIC) private latencyMetric: Gauge<string>,
    @InjectMetric(MICRO_TOTAL_METRIC) private totalCallLatency: Counter<string>,
  ) {
    this.logService.setContext(MicroMetricInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startedAt = new Date().getTime();
    const service = (context.getClass() as any).serviceName ?? context.getClass().name;
    const method = context.getHandler().name;
    const serviceName = `${service}#${method}`;

    if (method === 'healthCheck') {
      return next.handle();
    }

    this.totalCallLatency.inc({ service: serviceName });
    return next.handle().pipe(
      tap(_ => {
        const elapsedTime = new Date().getTime() - startedAt;
        this.latencyMetric.set({ service: serviceName, status: MicroStatus.SUCCESS }, elapsedTime);

        const timeString = getTimeString(elapsedTime);
        this.logService.info('micro: %s (%s) %s', serviceName, timeString, MicroStatus.SUCCESS);
      }),
      catchError(err => {
        const elapsedTime = new Date().getTime() - startedAt;
        this.latencyMetric.set({ service: serviceName, status: err.status }, elapsedTime);

        const timeString = getTimeString(elapsedTime);
        this.logService.warn('micro: %s (%s) %s', serviceName, timeString, err.status);
        return throwError(() => err);
      }),
    );
  }
}
