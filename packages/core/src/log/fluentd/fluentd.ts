import { DestinationStream } from 'pino';
import createFluentd from 'pino-fluentd';
import { FluentdConfig } from './fluentd.config';

export const createFluentdStream = (appName: string, cfg: FluentdConfig): DestinationStream => {
  return createFluentd({ ...cfg, tag: appName });
};
