import { INestApplication } from '@nestjs/common';
import { ApplicationMiddlewareFactory, resolveMiddleware } from '../../base';
import { ConfigService, LogService } from '../../modules';
import { MicroConfig } from './micro.config';

export class MicroFactory {
  static async bootstrap(app: INestApplication, middlewares: ApplicationMiddlewareFactory = {}): Promise<void> {
    const configService = app.get(ConfigService);
    const logService = await app.resolve(LogService);
    logService.setContext(MicroFactory.name);

    const microConfig = configService.parseOrThrow(MicroConfig, 'micro');
    const { port, inheritAppConfig, transports } = microConfig;
    const baseUrl = `http://localhost:${port}`;
    const name = configService.get('name').replace('@', '').replace('/', '-');
    const description = configService.get('description');

    app.useGlobalGuards(...(await resolveMiddleware(app, middlewares?.guards)));
    app.useGlobalPipes(...(await resolveMiddleware(app, middlewares?.pipes)));
    app.useGlobalInterceptors(...(await resolveMiddleware(app, middlewares?.interceptors)));
    app.useGlobalFilters(...(await resolveMiddleware(app, middlewares?.filters)));

    transports
      .filter(t => t.enable)
      .map(transport => {
        app.connectMicroservice(transport.getOptions(), { inheritAppConfig });
        logService.info('App connecting transport %s: %j', transport.transport, transport.options);
      });

    if (middlewares.beforeInit) await middlewares.beforeInit(app);

    await app.startAllMicroservices().then(() => {
      logService.info(`🚀 Service %s (%s) is running all microservices`, description, name);
    });

    if (microConfig.httpEnable) {
      await app.listen(port, () => {
        logService.info(`🚀 Service %s (%s) is running on %s`, description, name, baseUrl);
      });
    }

    if (middlewares.afterInit) await middlewares.afterInit(app);
  }
}
