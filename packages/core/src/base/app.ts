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
import { isFunction, isNil, omit } from 'lodash';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '../config';
import { GatewayConfig, GatewayService, MicroConfig, MicroService } from '../infras';

export type Module = NestModule;
export type ApplicationMiddlewares = {
  guards?: CanActivate[];
  pipes?: PipeTransform[];
  interceptors?: NestInterceptor[];
  filters?: ExceptionFilter[];
};
export type ApplicationMiddlewareFactory = {
  guards?: CanActivate[] | ((app: INestApplication) => CanActivate[]);
  pipes?: PipeTransform[] | ((app: INestApplication) => PipeTransform[]);
  interceptors?: NestInterceptor[] | ((app: INestApplication) => NestInterceptor[]);
  filters?: ExceptionFilter[] | ((app: INestApplication) => ExceptionFilter[]);
};
export type ApplicationOptions = NestApplicationOptions & ApplicationMiddlewareFactory;

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
    opts?: ApplicationOptions,
    bootstrap?: (app?: INestApplication, opts?: ApplicationMiddlewares) => Promise<void>,
  ): Promise<void> {
    const appOpts: NestApplicationOptions = omit(opts, ['guards', 'pipes', 'interceptors', 'filters']);
    const app = await NestFactory.create<NestExpressApplication>(module, { logger: console, ...appOpts });

    const logger = app.get(Logger);
    app.useLogger(logger);
    Application.initTrackingProcessEvent(logger);

    const config = app.get(ConfigService);
    const middlewares: ApplicationMiddlewares = {
      guards: isFunction(opts?.guards) ? opts?.guards(app) : opts?.guards,
      pipes: isFunction(opts?.pipes) ? opts?.pipes(app) : opts?.pipes,
      interceptors: isFunction(opts?.interceptors) ? opts?.interceptors(app) : opts?.interceptors,
      filters: isFunction(opts?.filters) ? opts?.filters(app) : opts?.filters,
    };

    if (!isNil(bootstrap)) {
      await bootstrap(app, middlewares);
      return;
    }

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
