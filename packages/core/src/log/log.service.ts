import pino, { DestinationStream, StreamEntry } from 'pino';
import { Params as LoggerParam } from 'nestjs-pino';
import { Options as PinoHttpOptions } from 'pino-http';
import { ConfigService, ENV } from '../config';
import { LogConfig } from './log.config';
import { createConsoleStream } from './console/console';
import { createLogstashStream } from './logstash/logstash';
import { createFluentdStream } from './fluentd/fluentd';
import { createCloudWatchStream } from './cloudwatch/cloudwatch';
import { createGoogleCloudLoggingStream } from './googleLog/googleLog';
import { createLokiStream } from './loki/loki';
import { PrettyOptions } from 'pino-pretty';

export const createPinoHttp = (configService: ConfigService): LoggerParam => {
  const config: LogConfig = configService.parse(LogConfig, 'log');
  const appName = configService.get('name').replace('@', '').replace('/', '-');

  const streams: DestinationStream[] = [createConsoleStream()];
  if (config?.logStash?.enable) streams.push(createLogstashStream(appName, config.logStash));
  if (config?.fluentd?.enable) streams.push(createFluentdStream(appName, config.fluentd));
  if (config?.cloudWatch?.enable) streams.push(createCloudWatchStream(appName, config.cloudWatch));
  if (config?.googleLog?.enable) streams.push(createGoogleCloudLoggingStream(appName, config.googleLog));
  if (config?.loki?.enable) streams.push(createLokiStream(appName, config.loki));

  const basePino: PinoHttpOptions = { base: { version: configService.get('version') } };
  const prettyPino: PinoHttpOptions = {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
        colorize: true,
        crlf: true,
        ignore: 'req,pid,hostname',
      } as PrettyOptions,
    },
  };

  const isProd = configService.get<string>('env') === ENV.PROD;
  const pinoConfig: PinoHttpOptions = isProd || config.output === 'json' ? basePino : prettyPino;

  return {
    pinoHttp: [
      { ...pinoConfig, level: config.level, name: appName, enabled: true, autoLogging: false },
      pino.multistream(streams.map<StreamEntry>(stream => ({ level: config.level, stream }))),
    ],
  };
};
