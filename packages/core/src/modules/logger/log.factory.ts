import { ecsFormat } from '@elastic/ecs-pino-format';
import { cloneDeep, isEmpty, omit, pick } from 'lodash';
import { Params as LoggerParam } from 'nestjs-pino';
import pino, { DestinationStream, StreamEntry, TransportTargetOptions } from 'pino';
import { Options as PinoHttpOptions } from 'pino-http';
import { PrettyOptions } from 'pino-pretty';
import { toArray, toBool, toInt } from '../../utils';
import { ConfigService, ENV } from '../config';
import { LogSocket } from './log-socket.config';
import { LogTransport } from './log-transport.config';
import { LogConfig } from './log.config';
import { LogFormat, LogSocketMode } from './log.enum';

export const createPinoTransport = (transports: LogTransport | LogTransport[]): DestinationStream[] => {
  return toArray(transports).filter(transport => transport.enable).map(transport => {
    return pino.transport({
      target: transport.target,
      level: transport.level,
      options: { ...transport.options },
    } as TransportTargetOptions);
  });
};

export const createPinoSocket = (sockets: LogSocket | LogSocket[]): DestinationStream[] => {
  return toArray(sockets).filter(socket => socket.enable).map(socket => {
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
  const useJson = configService.get<string>('env') === ENV.PROD || config.format === LogFormat.JSON;

  const streams: DestinationStream[] = [pino.destination(1), ...customStreams];
  if (useJson && config.fileDir) streams.push(pino.destination({ dest: `./${config.fileDir}` }));
  if (useJson && config.socket) streams.push(...createPinoSocket(config.socket));
  if (useJson && config.transport) streams.push(...createPinoTransport(config.transport));

  const ecsPino: PinoHttpOptions = ecsFormat({
    serviceName: configService.get('name'),
    serviceVersion: configService.get('version'),
    serviceEnvironment: configService.get('env'),
    convertErr: true,
    convertReqRes: false,
  });

  const prettyPino: PinoHttpOptions = {
    name: appName,
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

  const pinoConfig = useJson ? ecsPino : prettyPino;

  return {
    pinoHttp: [
      {
        ...pinoConfig,
        level: config.level,
        enabled: true,
        autoLogging: false,
        formatters: {
          ...pinoConfig.formatters,
          log: (object: Record<string, any>): Record<string, any> => {
            const escObject = useJson ? pinoConfig.formatters.log(object) : cloneDeep(object);
            const args = omit(escObject, ['context', 'err', 'error']);
            const result: Record<string, any> = { context: escObject.context };

            if (escObject.err) result.err = pick(escObject.err, ['type', 'message', 'stack']);
            if (escObject.error) result.error = escObject.error;
            if (!isEmpty(args)) result.args = args;

            return result;
          },
        },
      },
      pino.multistream(streams.map<StreamEntry>(stream => ({ level: config.level, stream }))),
    ],
  };
};
