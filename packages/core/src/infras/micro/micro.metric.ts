import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectMetric, makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge } from 'prom-client';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExpressRequest } from '../../base';
import { LogService } from '../../log';
import { getTimeString } from '../../utils';

const ExcludePaths = ['/swagger', '/bulls', '/metrics'];
const MICRO_LATENCY_METRIC = 'micro_call_latency';
const TOTAL_MICRO_METRIC = 'total_micro_call';

export enum MicroStatus {
  SUCCESS = 'SUCCESS',
}

export const microLatency = makeGaugeProvider({
  name: MICRO_LATENCY_METRIC,
  help: `Micro Call Latency`,
  labelNames: ['service', 'status'],
});

export const totalMicroCounter = makeCounterProvider({
  name: TOTAL_MICRO_METRIC,
  help: `Total Micro Call Counter`,
  labelNames: ['service'],
});

@Injectable()
export class MicroMetric implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private logger: LogService,
    @InjectMetric(MICRO_LATENCY_METRIC) private latencyMetric: Gauge<string>,
    @InjectMetric(TOTAL_MICRO_METRIC) private totalCallLatency: Counter<string>,
  ) {
    this.logger.setContext(MicroMetric.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    if (ExcludePaths.includes(request.path)) {
      return next.handle();
    }

    const startedAt = new Date().getTime();
    const service = (context.getClass() as any).serviceName ?? context.getClass().name;
    const method = context.getHandler().name;
    const serviceName = `${service}#${method}`;

    this.totalCallLatency.inc({ service: serviceName });

    return next.handle().pipe(
      tap(_ => {
        const duration = new Date().getTime() - startedAt;
        this.latencyMetric.set({ service: serviceName, status: MicroStatus.SUCCESS }, duration);

        const timeString = getTimeString(duration);
        this.logger.info('micro: %s (%s) %s', serviceName, timeString, MicroStatus.SUCCESS);
      }),
      catchError(err => {
        const duration = new Date().getTime() - startedAt;
        this.latencyMetric.set({ service: serviceName, status: err.status }, duration);

        const timeString = getTimeString(duration);
        this.logger.warn('micro: %s (%s) %s', serviceName, timeString, err.status);

        return throwError(() => err);
      }),
    );
  }
}
