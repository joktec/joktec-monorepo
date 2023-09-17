import pino, { DestinationStream } from 'pino';
import { LogtailConfig } from './logtail.config';

export const createLogtailStream = (appName: string, cfg: LogtailConfig): DestinationStream => {
  return pino.transport({
    target: '@logtail/pino',
    options: { sourceToken: cfg.token },
  });
};
