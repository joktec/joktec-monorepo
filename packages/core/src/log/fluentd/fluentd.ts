import { FluentdConfig } from './fluentd.config';
import createFluentd from 'pino-fluentd';
import { DestinationStream } from 'pino';

export const createFluentdStream = (appName: string, cfg: FluentdConfig): DestinationStream => {
  return createFluentd({ ...cfg, tag: appName });
};
