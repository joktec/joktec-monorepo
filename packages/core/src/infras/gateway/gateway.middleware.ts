import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Request, Response, NextFunction } from 'express';
import { Counter, Histogram } from 'prom-client';
import { LogService } from '../../modules';
import { getTimeString } from '../../utils';
import { GATEWAY_DURATION_METRIC, GATEWAY_TOTAL_METRIC, GatewayStatus } from './gateway.metric';

@Injectable()
export class GatewayMetricMiddleware implements NestMiddleware {
  constructor(
    private logger: LogService,
    @InjectMetric(GATEWAY_DURATION_METRIC) private gatewayDurationMetric: Histogram<string>,
    @InjectMetric(GATEWAY_TOTAL_METRIC) private gatewayTotalMetric: Counter<string>,
  ) {
    this.logger.setContext(GatewayMetricMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const path = `${req.method} ${req.route?.path ?? req.path}`;
    const duration = this.gatewayDurationMetric.startTimer({ path });

    res.on('finish', () => {
      const elapsedTime = duration();
      const timeString = getTimeString(elapsedTime);
      const statusCode = res.statusCode;

      if (statusCode >= 200 && statusCode < 300) {
        this.gatewayTotalMetric.inc({ path, status: GatewayStatus.SUCCESS, statusCode });
        this.logger.info('http: %s (%s) %s', path, timeString, statusCode);
      } else {
        let className: string = 'Unknown';
        try {
          const stack = new Error().stack?.split(/\r\n|\r|\n/);
          className = stack[1].split(/\b(\s)/)[2];
        } catch (error) {
          this.logger.debug('Error to get className');
        }

        this.gatewayTotalMetric.inc({ path, status: GatewayStatus.FAILED, statusCode, className });
        if (statusCode >= 400 && statusCode < 500) {
          this.logger.warn('http: %s (%s) %s', path, timeString, statusCode);
        } else {
          this.logger.error('http: %s (%s) %s', path, timeString, statusCode);
        }
      }
    });

    next();
  }
}
