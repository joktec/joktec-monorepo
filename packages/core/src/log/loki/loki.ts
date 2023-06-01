import pinoLoki, { LokiOptions } from 'pino-loki';
import { LokiConfig } from './loki.config';
import { DestinationStream } from 'pino';
import { Logger } from '@nestjs/common';

export const createLokiStream = (appName: string, cfg: LokiConfig): DestinationStream => {
  const logger = new Logger('LokiService');
  const options: LokiOptions = {
    batching: true,
    interval: 5,
    host: cfg.host,
    labels: { application: appName },
  };
  if (cfg.username && cfg.password) {
    options.basicAuth = { username: cfg.username, password: cfg.password };
  }

  const transport = pinoLoki(options);
  transport.on('connect', () => logger.log('Connected to Loki successfully!'));
  transport.on('error', (error: Error) => logger.error('Failed to connect to Loki:', error.stack));
  return transport;
};
