import { FluentdConfig } from './fluentd.config';

const createFluentd = require('pino-fluentd');

export const createFluentdStream = (appName: string, cfg: FluentdConfig) => {
  return createFluentd({ ...cfg, tag: appName });
};
