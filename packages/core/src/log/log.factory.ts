import { omit } from 'lodash';
import { Params as LoggerParam } from 'nestjs-pino';
import pino, { DestinationStream, StreamEntry } from 'pino';
import { Options as PinoHttpOptions } from 'pino-http';
import { PrettyOptions } from 'pino-pretty';
import { ConfigService, ENV } from '../config';
import { createCloudWatchStream } from './cloudwatch/cloudwatch';
import { createConsoleStream } from './console/console';
import { createFluentdStream } from './fluentd/fluentd';
import { createGoogleCloudLoggingStream } from './googleLog/googleLog';
import { LogConfig } from './log.config';
import { createLogstashStream } from './logstash/logstash';
import { createLokiStream } from './loki/loki';
import { createMongoLoggingStream } from './mongodb/pino-mongo';

export const createPinoHttp = async (configService: ConfigService): Promise<LoggerParam> => {
  const config: LogConfig = configService.parse(LogConfig, 'log');
  const appName = configService.get('name').replace('@', '').replace('/', '-');

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

  const useJson = configService.get<string>('env') === ENV.PROD || config.output === 'json';
  const pinoConfig: PinoHttpOptions = useJson ? basePino : prettyPino;

  const streams: DestinationStream[] = [createConsoleStream()];
  if (config?.logStash?.enable) streams.push(createLogstashStream(appName, config.logStash));
  if (config?.fluentd?.enable) streams.push(createFluentdStream(appName, config.fluentd));
  if (config?.cloudWatch?.enable) streams.push(createCloudWatchStream(appName, config.cloudWatch));
  if (config?.googleLog?.enable) streams.push(createGoogleCloudLoggingStream(appName, config.googleLog));
  if (config?.loki?.enable) streams.push(createLokiStream(appName, config.loki));
  if (config?.mongo?.enable && useJson) streams.push(await createMongoLoggingStream(appName, config.mongo));

  return {
    pinoHttp: [
      {
        ...pinoConfig,
        level: config.level,
        name: appName,
        enabled: true,
        autoLogging: false,
        formatters: {
          log: (object: Record<string, unknown>): Record<string, unknown> => {
            return {
              context: object.context,
              args: omit(object, ['context']),
            };
          },
        },
      },
      pino.multistream(streams.map<StreamEntry>(stream => ({ level: config.level, stream }))),
    ],
  };
};
