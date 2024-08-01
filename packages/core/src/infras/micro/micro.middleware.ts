import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Request, Response, NextFunction } from 'express';
import { Counter, Gauge } from 'prom-client';
import { LogService } from '../../modules';
import { getTimeString } from '../../utils';
import { MICRO_LATENCY_METRIC, MICRO_TOTAL_METRIC, MicroStatus } from './micro.metric';

@Injectable()
export class MicroMetricMiddleware implements NestMiddleware {
  constructor(
    private logger: LogService,
    @InjectMetric(MICRO_LATENCY_METRIC) private latencyMetric: Gauge<string>,
    @InjectMetric(MICRO_TOTAL_METRIC) private totalCallLatency: Counter<string>,
  ) {
    this.logger.setContext(MicroMetricMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const startedAt = new Date().getTime();
    const service = req.route?.path ?? 'UnknownService';
    const method = req.method;
    const serviceName = `${service}#${method}`;

    this.totalCallLatency.inc({ service: serviceName });

    res.on('finish', () => {
      const elapsedTime = new Date().getTime() - startedAt;
      const timeString = getTimeString(elapsedTime);
      const statusCode = res.statusCode;

      if (statusCode >= 200 && statusCode < 300) {
        this.latencyMetric.set({ service: serviceName, status: MicroStatus.SUCCESS }, elapsedTime);
        this.logger.info('micro: %s (%s) %s', serviceName, timeString, MicroStatus.SUCCESS);
      } else {
        this.latencyMetric.set({ service: serviceName, status: statusCode }, elapsedTime);
        this.logger.warn('micro: %s (%s) %s', serviceName, timeString, statusCode);
      }
    });

    next();
  }
}
