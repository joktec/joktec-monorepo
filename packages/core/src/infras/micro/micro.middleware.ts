import { getTimeString } from '@joktec/utils';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { NextFunction, Request, Response } from 'express';
import { Counter, Gauge } from 'prom-client';
import { LogService } from '../../modules';
import { MICRO_LATENCY_METRIC, MICRO_TOTAL_METRIC, MicroStatus } from './micro.metric';

@Injectable()
export class MicroMetricMiddleware implements NestMiddleware {
  constructor(
    private logService: LogService,
    @InjectMetric(MICRO_LATENCY_METRIC) private latencyMetric: Gauge<string>,
    @InjectMetric(MICRO_TOTAL_METRIC) private totalCallLatency: Counter<string>,
  ) {
    this.logService.setContext(MicroMetricMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const startedAt = new Date().getTime();
    const service = req.route?.path ?? 'UnknownService';
    const method = req.method;
    const serviceName = `${service}#${method}`;

    if (method === 'healthCheck') {
      next();
      return;
    }

    this.totalCallLatency.inc({ service: serviceName });
    res.on('finish', () => {
      const elapsedTime = new Date().getTime() - startedAt;
      const timeString = getTimeString(elapsedTime);
      const statusCode = res.statusCode;

      req['responseTime'] = elapsedTime;
      if (statusCode >= 200 && statusCode < 300) {
        this.latencyMetric.set({ service: serviceName, status: MicroStatus.SUCCESS }, elapsedTime);
        this.logService.info('micro: %s (%s) %s', serviceName, timeString, MicroStatus.SUCCESS);
      } else {
        this.latencyMetric.set({ service: serviceName, status: statusCode }, elapsedTime);
        this.logService.warn('micro: %s (%s) %s', serviceName, timeString, statusCode);
      }
    });

    next();
  }
}
