import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Counter, Histogram } from 'prom-client';
import { InjectMetric, makeHistogramProvider, makeCounterProvider } from '@willsoto/nestjs-prometheus';

const GATEWAY_DURATION_SECONDS_METRIC = 'gateway_duration_seconds';
const GATEWAY_TOTAL_METRIC = 'gateway_total';

const gatewayDurationSeconds = makeHistogramProvider({
  name: GATEWAY_DURATION_SECONDS_METRIC,
  help: 'Gateway duration by path',
  labelNames: ['path'],
});

const gatewayTotal = makeCounterProvider({
  name: GATEWAY_TOTAL_METRIC,
  help: `Gateway call total`,
  labelNames: ['path', 'status', 'statusCode', 'className'],
});

@Injectable()
export class GatewayPromInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric(GATEWAY_DURATION_SECONDS_METRIC)
    private gatewayDurationSecondsMetric: Histogram<string>,
    @InjectMetric(GATEWAY_TOTAL_METRIC) private gatewayTotalMetric: Counter<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = `${request.method} ${request.route?.path ?? request.path}`;

    const duration = this.gatewayDurationSecondsMetric.startTimer({ path });

    return next.handle().pipe(
      tap(_ => {
        duration();

        this.gatewayTotalMetric.inc({
          path,
          status: 'SUCCESS',
          statusCode: context.switchToHttp().getResponse().statusCode || 'unknown',
        });
      }),
      catchError(err => {
        duration();

        let functionName: string;
        try {
          const stack = err.stack?.split(/\r\n|\r|\n/);
          functionName = stack[1].split(/\b(\s)/)[2];
        } catch (error) {}

        this.gatewayTotalMetric.inc({
          path,
          status: 'FAILED',
          statusCode: err.status || 'unknown',
          className: functionName || 'unknown',
        });

        return throwError(err);
      }),
    );
  }
}

export const gatewayPromInterceptors = [GatewayPromInterceptor, gatewayDurationSeconds, gatewayTotal];
