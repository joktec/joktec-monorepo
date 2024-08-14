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
import { GatewayConfig, GatewayService, MicroConfig, MicroService } from '../infras';
import { ConfigService } from '../modules';

export type Module = NestModule;

export type ApplicationMiddlewares = {
  guards?: CanActivate[];
  pipes?: PipeTransform[];
  interceptors?: NestInterceptor[];
  filters?: ExceptionFilter[];
  beforeInit?: (app?: INestApplication) => void | Promise<void>;
  afterInit?: (app?: INestApplication) => void | Promise<void>;
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
  static initTrackingProcessEvent(logger: Logger) {
    logger.log(`🚀 Init app tracking process event`);
    const signalsNames: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];
    signalsNames.forEach(signalName =>
      process.on(signalName, signal => {
        logger.log(`🚨 Retrieved signal: ${signal}, application terminated`);
        process.exit(0);
      }),
    );

    process.on('uncaughtException', (error: Error) => {
      logger.error({ err: error }, `🚨 Uncaught Promise Exception with error`);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error(`🚨 Unhandled Promise Rejection, reason: ${reason}`);
      promise.catch((err: Error) => {
        logger.error({ err }, `🚨 Unhandled Promise Rejection with error`);
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

    Application.initTrackingProcessEvent(logger);

    const config = app.get(ConfigService);
    const middlewares: ApplicationMiddlewares = {
      ...factory,
      guards: isFunction(factory.guards) ? await factory.guards(app) : factory.guards,
      pipes: isFunction(factory.pipes) ? await factory.pipes(app) : factory.pipes,
      interceptors: isFunction(factory.interceptors) ? await factory.interceptors(app) : factory.interceptors,
      filters: isFunction(factory.filters) ? await factory.filters(app) : factory.filters,
    };

    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig) {
      await GatewayService.bootstrap(app, middlewares);
      return;
    }

    const microConfig = config.get<MicroConfig>('micro');
    if (microConfig) {
      await MicroService.bootstrap(app, middlewares);
      return;
    }
  }
}
