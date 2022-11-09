import { multistream } from 'pino-multi-stream';
import { ConfigService, ENV } from '../config';
import { LogConfig } from './log.config';
import { createConsoleStream } from './console/console';
import { createLogstashStream } from './logtash/logstash';
import { createFluentdStream } from './fluentd/fluentd';

export const createPinoHttp = (configService: ConfigService) => {
  const config = new LogConfig(configService.get<LogConfig>('log' as any));

  const streams = [createConsoleStream(config.level)];
  if (config?.logStash?.enable) streams.push(createLogstashStream(config.logStash));
  if (config?.fluentd?.enable) streams.push(createFluentdStream(config.fluentd));

  const isProd = configService.get<string>('env') === ENV.PROD;
  const pinoConfig = isProd
    ? {
        base: {
          version: configService.get('version'),
        },
      }
    : {
        prettifier: require('pino-pretty'),
        prettyPrint: {
          translateTime: true,
          colorize: true,
          crlf: true,
          search: config.contexts,
          ignore: 'req,pid,hostname',
        },
      };

  return {
    pinoHttp: [
      {
        level: config.level,
        name: configService.get('name').replace('@jobhopin/', ''),
        messageKey: 'message',
        enabled: true,
        ...pinoConfig,
        autoLogging: false,
      },
      multistream(streams),
    ] as any,
  };
};
