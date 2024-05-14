import { isEmpty, omit } from 'lodash';
import { Params as LoggerParam } from 'nestjs-pino';
import pino, { Bindings, DestinationStream, StreamEntry, TransportTargetOptions } from 'pino';
import { PrettyOptions } from 'pino-pretty';
import { toArray, toBool, toInt } from '../../utils';
import { ConfigService } from '../config';
import { LogSocket } from './log-socket.config';
import { LogTransport } from './log-transport.config';
import { LogConfig } from './log.config';
import { LogLevel, LogSocketMode } from './log.enum';

const createPrettyTransport = (level: LogLevel): DestinationStream => {
  const options: PrettyOptions = {
    messageKey: 'message',
    timestampKey: '@timestamp',
    translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
    colorize: true,
    crlf: true,
    ignore: 'req,pid,hostname,version',
    destination: 1,
  };
  return pino.transport({ target: 'pino-pretty', level: level, options } as TransportTargetOptions);
};

export const createPinoTransport = (transports: LogTransport | LogTransport[]): DestinationStream[] => {
  return toArray(transports)
    .filter(transport => transport.enable)
    .map(transport => {
      return pino.transport({
        target: transport.target,
        level: transport.level,
        options: { ...transport.options },
      } as TransportTargetOptions);
    });
};

export const createPinoSocket = (sockets: LogSocket | LogSocket[]): DestinationStream[] => {
  return toArray(sockets)
    .filter(socket => socket.enable)
    .map(socket => {
      return pino.transport({
        target: 'pino-socket',
        options: {
          mode: socket.mode || LogSocketMode.TCP,
          address: socket.host || '127.0.0.1',
          port: toInt(socket.port, 514),
          reconnect: toBool(socket.reconnect, true),
          reconnectTries: toInt(socket.reconnectTries, Infinity),
          ...socket,
        },
      });
    });
};

export const createPinoHttp = async (
  configService: ConfigService,
  customStreams: DestinationStream[] = [],
): Promise<LoggerParam> => {
  const config: LogConfig = configService.parseOrThrow(LogConfig, 'log');
  const appName = configService.get('name').replace('@', '').replace('/', '-');

  const streams: DestinationStream[] = [createPrettyTransport(config.level), ...customStreams];
  if (config.fileDir) streams.push(pino.destination({ dest: `./${config.fileDir}` }));
  if (toArray(config.socket).length) streams.push(...createPinoSocket(config.socket));
  if (toArray(config.transport).length) streams.push(...createPinoTransport(config.transport));

  return {
    pinoHttp: [
      {
        messageKey: 'message',
        timestamp: () => `,"@timestamp":"${new Date().toISOString()}"`,
        name: appName,
        level: config.level,
        enabled: true,
        autoLogging: false,
        formatters: {
          level: (label, number): Record<string, any> => {
            return { level: label };
          },
          bindings: (bindings: Bindings) => {
            const { pid, hostname, name, ...restBindings } = bindings;
            return {
              pid,
              hostname,
              name,
              version: configService.get('version'),
              environment: configService.get('env'),
              ...restBindings,
            };
          },
          log: (object: Record<string, any>): Record<string, any> => {
            const args = omit(object, ['context', 'error']);
            const result: Record<string, any> = { context: object.context || 'UnknownContext' };
            if (result.error) result.error = object.error;
            if (!isEmpty(args)) result.args = args;
            return result;
          },
        },
      },
      pino.multistream(streams.map<StreamEntry>(stream => ({ level: config.level, stream }))),
    ],
  };
};
