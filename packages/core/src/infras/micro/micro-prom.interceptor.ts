import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Counter, Gauge } from 'prom-client';
import { InjectMetric, makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';

export const MICRO_LATENCY_METRIC = 'micro_call_latency';
const microLatency = makeGaugeProvider({
  name: MICRO_LATENCY_METRIC,
  help: `Micro Call Latency`,
  labelNames: ['service', 'status'],
});

export const TOTAL_MICRO_METRIC = 'total_micro_call';
const totalMicroCounter = makeCounterProvider({
  name: TOTAL_MICRO_METRIC,
  help: `Total Micro Call Counter`,
  labelNames: ['service'],
});

@Injectable()
export class MicroPromInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric(MICRO_LATENCY_METRIC) private latencyMetric: Gauge<string>,
    @InjectMetric(TOTAL_MICRO_METRIC) private totalCallLatency: Counter<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startedAt = new Date().getTime();

    const method = context.getHandler().name;
    const service = (context.getClass() as any).serviceName ?? context.getClass().name;

    this.totalCallLatency.inc({ service: `${service}#${method}` });

    return next
      .handle()
      .pipe(
        map(data => {
          this.latencyMetric.set(
            { service: `${service}#${method}`, status: 'SUCCESS' },
            new Date().getTime() - startedAt,
          );
          return data;
        }),
      )
      .pipe(
        catchError(err => {
          this.latencyMetric.set(
            { service: `${service}#${method}`, status: err.status },
            new Date().getTime() - startedAt,
          );
          return throwError(err);
        }),
      );
  }
}

export const microPromInterceptors = [MicroPromInterceptor, microLatency, totalMicroCounter];
