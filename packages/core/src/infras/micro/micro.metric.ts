import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectMetric, makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge } from 'prom-client';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExpressRequest } from '../../base';
import { LogService } from '../../logger';
import { getTimeString } from '../../utils';

const ExcludePaths = ['/swagger', '/bulls', '/metrics'];
const MICRO_LATENCY_METRIC = 'micro_call_latency';
const MICRO_TOTAL_METRIC = 'micro_call_total';

export enum MicroStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export const microLatency = makeGaugeProvider({
  name: MICRO_LATENCY_METRIC,
  help: `Micro Call Latency`,
  labelNames: ['service', 'status'],
});

export const totalMicroCounter = makeCounterProvider({
  name: MICRO_TOTAL_METRIC,
  help: `Total Micro Call Counter`,
  labelNames: ['service'],
});

@Injectable()
export class MicroMetric implements NestInterceptor {
  constructor(
    private logger: LogService,
    @InjectMetric(MICRO_LATENCY_METRIC) private latencyMetric: Gauge<string>,
    @InjectMetric(MICRO_TOTAL_METRIC) private totalCallLatency: Counter<string>,
  ) {
    this.logger.setContext(MicroMetric.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    if (ExcludePaths.includes(request.path)) return next.handle();

    const startedAt = new Date().getTime();
    const service = (context.getClass() as any).serviceName ?? context.getClass().name;
    const method = context.getHandler().name;
    const serviceName = `${service}#${method}`;

    this.totalCallLatency.inc({ service: serviceName });

    return next.handle().pipe(
      tap(_ => {
        const elapsedTime = new Date().getTime() - startedAt;
        this.latencyMetric.set({ service: serviceName, status: MicroStatus.SUCCESS }, elapsedTime);

        const timeString = getTimeString(elapsedTime);
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
