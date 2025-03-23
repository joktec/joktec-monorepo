import {
  CanActivate,
  ExceptionFilter,
  INestApplication,
  NestApplicationOptions,
  NestInterceptor,
  NestModule,
  PipeTransform,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { isFunction } from 'lodash';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { GatewayFactory, MicroFactory } from '../infras';
import { ConfigService, LogService } from '../modules';

export type Module = NestModule;

export const resolveMiddleware = async <T>(
  app: INestApplication,
  args: T[] | ((app: INestApplication) => T[] | Promise<T[]>),
): Promise<T[]> => {
  if (!args) return [];
  return isFunction(args) ? await args(app) : args;
};

export type ApplicationMiddlewareFactory = {
  guards?: CanActivate[] | ((app: INestApplication) => CanActivate[] | Promise<CanActivate[]>);
  pipes?: PipeTransform[] | ((app: INestApplication) => PipeTransform[] | Promise<PipeTransform[]>);
  interceptors?: NestInterceptor[] | ((app: INestApplication) => NestInterceptor[] | Promise<NestInterceptor[]>);
  filters?: ExceptionFilter[] | ((app: INestApplication) => ExceptionFilter[] | Promise<ExceptionFilter[]>);
  beforeInit?: (app?: INestApplication) => void | Promise<void>;
  afterInit?: (app?: INestApplication) => void | Promise<void>;
};

export class Application {
  static initTrackingProcessEvent(logger: LogService) {
    logger.info(`🚀 Init app tracking process event`);
    const signalsNames: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];
    signalsNames.forEach(signalName =>
      process.on(signalName, signal => {
        logger.info(`🚨 Retrieved signal: ${signal}, application terminated`);
        process.exit(0);
      }),
    );

    process.on('uncaughtException', (error: Error) => {
      logger.error(error, `🚨 Uncaught Promise Exception with error`);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error(`🚨 Unhandled Promise Rejection, reason: ${reason}`);
      promise.catch((err: Error) => {
        logger.error(err, `🚨 Unhandled Promise Rejection with error`);
        process.exit(1);
      });
    });
  }

  static async bootstrap(
    module: any,
    opts: NestApplicationOptions = {},
    factory: ApplicationMiddlewareFactory = {},
  ): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(module, { bufferLogs: true, ...opts });

    const logger = app.get(Logger);
    app.useLogger(logger);
    app.useGlobalInterceptors(new LoggerErrorInterceptor());

    const configService = app.get(ConfigService);
    const logService = await app.resolve(LogService);
    logService.setContext(Application.name);
    Application.initTrackingProcessEvent(logService);

    if (configService.exist('gateway')) {
      await GatewayFactory.bootstrap(app, factory);
      return;
    }

    if (configService.exist('micro')) {
      await MicroFactory.bootstrap(app, factory);
      return;
    }

    logService.info(`🚨 Not found config, application terminated`);
    process.exit(1);
  }
}
