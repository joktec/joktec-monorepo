import pinoLoki, { LokiOptions } from 'pino-loki';
import { LokiConfig } from './loki.config';

export const createLokiStream = (appName: string, cfg: LokiConfig) => {
  const options: LokiOptions = {
    batching: true,
    interval: 5,
    host: cfg.host,
    labels: { application: appName },
  };
  if (cfg.username && cfg.password) {
    options.basicAuth = { username: cfg.username, password: cfg.password };
  }
  return { stream: pinoLoki(options) };
};
