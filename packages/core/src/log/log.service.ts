import { multistream } from 'pino-multi-stream';
import { ConfigService, ENV } from '../config';
import { LogConfig } from './log.config';
import { createConsoleStream } from './console/console';
import { createLogstashStream } from './logstash/logstash';
import { createFluentdStream } from './fluentd/fluentd';
import { createCloudWatchStream } from './cloudwatch/cloudwatch';

export const createPinoHttp = (configService: ConfigService) => {
  const config = new LogConfig(configService.get<LogConfig>('log' as any));
  const appName = configService.get('name').replace('@joktec/', '');

  const streams = [createConsoleStream(config.level)];
  if (config?.logStash?.enable) streams.push(createLogstashStream(appName, config.logStash));
  if (config?.fluentd?.enable) streams.push(createFluentdStream(appName, config.fluentd));
  if (config?.cloudWatch?.enable) streams.push(createCloudWatchStream(appName, config.cloudWatch));

  const basePino = { base: { version: configService.get('version') } };
  const prettyPino = {
    prettifier: require('pino-pretty'),
    prettyPrint: {
      translateTime: true,
      colorize: true,
      crlf: true,
      search: config.contexts,
      ignore: 'req,pid,hostname',
    },
  };

  const isProd = configService.get<string>('env') === ENV.PROD;
  const pinoConfig = isProd || config.output === 'json' ? basePino : prettyPino;

  return {
    pinoHttp: [
      { ...pinoConfig, level: config.level, name: appName, messageKey: 'message', enabled: true, autoLogging: false },
      multistream(streams),
    ] as any,
  };
};
