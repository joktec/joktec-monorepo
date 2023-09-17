import {
  CanActivate,
  ExceptionFilter,
  NestApplicationOptions,
  NestInterceptor,
  NestModule,
  PipeTransform,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { GatewayConfig, GatewayService, MicroConfig, MicroService } from '../infras';

export type GlobalOptions = {
  guards?: CanActivate[];
  pipes?: PipeTransform[];
  interceptors?: NestInterceptor[];
  filters?: ExceptionFilter[];
};
export type Module = NestModule;
export type ApplicationOptions = NestApplicationOptions & GlobalOptions;

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

  static async bootstrap(module: any, opts?: ApplicationOptions): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(module, { logger: console, ...opts });

    const logger = app.get(Logger);
    app.useLogger(logger);
    Application.initTrackingProcessEvent(logger);

    const config = app.get(ConfigService);

    const gatewayConfig = config.get<GatewayConfig>('gateway');
    if (gatewayConfig) {
      await GatewayService.bootstrap(app, opts);
      return app;
    }

    const microConfig = config.get<MicroConfig>('micro');
    if (microConfig) {
      await MicroService.bootstrap(app, opts);
      return app;
    }
  }
}
