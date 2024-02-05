import { INestApplication } from '@nestjs/common';
import { ApplicationMiddlewares } from '../../base';
import { ConfigService } from '../../config';
import { LogService } from '../../logger';
import { toArray } from '../../utils';
import { MicroConfig } from './micro.config';

export class MicroService {
  static async bootstrap(app: INestApplication, middlewares?: ApplicationMiddlewares): Promise<void> {
    const config = app.get(ConfigService);
    const logger = await app.resolve(LogService);
    logger.setContext(MicroService.name);

    const microConfig = config.parseOrThrow(MicroConfig, 'micro');
    const { port, inheritAppConfig, transports } = microConfig;
    const baseUrl = `http://localhost:${port}`;
    const name = config.get('name').replace('@', '').replace('/', '-');
    const description = config.get('description');

    app.useGlobalGuards(...toArray(middlewares?.guards));
    app.useGlobalPipes(...toArray(middlewares?.pipes));
    app.useGlobalInterceptors(...toArray(middlewares?.interceptors));
    app.useGlobalFilters(...toArray(middlewares?.filters));

    transports
      .filter(t => t.enable)
      .map(transport => {
        app.connectMicroservice(transport.getOptions(), { inheritAppConfig });
        logger.info('App connecting transport %s: %j', transport.transport, transport.options);
      });

    await app.startAllMicroservices().then(() => {
      logger.info(`🚀 Service %s (%s) is running all microservices`, description, name);
    });

    if (microConfig.httpEnable) {
      await app.listen(port, () => {
        logger.info(`🚀 Service %s (%s) is running on %s`, description, name, baseUrl);
      });
    }
  }
}
