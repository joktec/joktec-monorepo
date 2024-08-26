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
    private logService: LogService,
    @InjectMetric(GATEWAY_DURATION_METRIC) private gatewayDurationMetric: Histogram<string>,
    @InjectMetric(GATEWAY_TOTAL_METRIC) private gatewayTotalMetric: Counter<string>,
  ) {
    this.logService.setContext(GatewayMetricMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const skipPath = ['/health', '/metrics', '/bulls', '/swagger', '/swagger-json', '/favicon.ico'];
    const { method, baseUrl, path, originalUrl } = req;
    if (skipPath.includes(originalUrl)) {
      next();
      return;
    }

    const metricPath = `${method} ${baseUrl + path}`;
    const duration = this.gatewayDurationMetric.startTimer({ path: metricPath });

    res.on('finish', () => {
      const elapsedTime = duration() * 1000.0;
      const timeString = getTimeString(elapsedTime);
      const statusCode = res.statusCode;

      req['responseTime'] = elapsedTime;
      if (statusCode >= 200 && statusCode < 300) {
        this.gatewayTotalMetric.inc({ path: metricPath, status: GatewayStatus.SUCCESS, statusCode });
        this.logService.info('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
      } else {
        let className: string = 'Unknown';
        try {
          const stack = new Error().stack?.split(/\r\n|\r|\n/);
          className = stack[1].split(/\b(\s)/)[2];
        } catch (error) {
          this.logService.debug('Error to get className');
        }

        this.gatewayTotalMetric.inc({ path: metricPath, status: GatewayStatus.FAILED, statusCode, className });
        if (statusCode >= 400 && statusCode < 500) {
          this.logService.warn('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
        } else {
          this.logService.error('http: [%s] %s (%s) %s', method, originalUrl, timeString, statusCode);
        }
      }
    });

    next();
  }
}
