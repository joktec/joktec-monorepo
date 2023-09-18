import { lookup } from 'geoip-lite';
import { isEmpty, omit, trim } from 'lodash';
import { Params as LoggerParam } from 'nestjs-pino';
import pino, { DestinationStream, StreamEntry } from 'pino';
import { Options as PinoHttpOptions } from 'pino-http';
import { PrettyOptions } from 'pino-pretty';
import requestIp from 'request-ip';
import { ExpressRequest } from '../base';
import { ConfigService, ENV } from '../config';
import { parseUA } from '../utils';
import { createCloudWatchStream } from './cloudwatch/cloudwatch';
import { createConsoleStream } from './console/console';
import { createFluentdStream } from './fluentd/fluentd';
import { createGoogleLoggingStream } from './googleLog/googleLog';
import { LogConfig } from './log.config';
import { createLogstashStream } from './logstash/logstash';
import { createLokiStream } from './loki/loki';
import { createMongoLoggingStream } from './mongodb/pino-mongo';

export const createPinoHttp = async (
  configService: ConfigService,
  customStreams: DestinationStream[] = [],
): Promise<LoggerParam> => {
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

  const useJson = configService.get<string>('env') === ENV.PROD || config.format === 'json';
  const pinoConfig: PinoHttpOptions = useJson ? basePino : prettyPino;

  const streams: DestinationStream[] = [createConsoleStream(), ...customStreams];
  if (config?.logStash?.enable) streams.push(createLogstashStream(appName, config.logStash));
  if (config?.fluentd?.enable) streams.push(createFluentdStream(appName, config.fluentd));
  if (config?.cloudWatch?.enable) streams.push(createCloudWatchStream(appName, config.cloudWatch));
  if (config?.googleLog?.enable) streams.push(createGoogleLoggingStream(appName, config.googleLog));
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
        serializers: {
          req(req: ExpressRequest) {
            const ipAddress = requestIp.getClientIp(req);
            req.body = req.raw.body;
            req.userAgent = parseUA(req.headers['user-agent'] || '');
            req.geoIp = { ipAddress, ...lookup(ipAddress) };
            return req;
          },
        },
        formatters: {
          log: (object: Record<string, any>): Record<string, any> => {
            const args = omit(object, ['context', 'err']);
            const result: Record<string, any> = { context: object.context };

            if (object.err) {
              result.err = object.err;
              if (result.err?.stack) {
                result.err.stack = result.err.stack.split('\n').map(trim);
              }
            }

            if (!isEmpty(args)) result.args = args;
            return result;
          },
        },
      },
      pino.multistream(streams.map<StreamEntry>(stream => ({ level: config.level, stream }))),
    ],
  };
};
