import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '../../config';
import { DEFAULT_MICRO_PORT, MicroConfig } from './micro.config';
import { LogService } from '../../log';
import { toArray, toBool } from '../../utils';
import mergeDeep from 'merge-deep';
import { GlobalOptions } from '../../base';

export class MicroService {
  static async bootstrap(app: INestApplication, opts?: GlobalOptions) {
    const config = app.get(ConfigService);
    const microConfig: MicroConfig = config.get<MicroConfig>('micro' as any);
    if (!microConfig) return;

    const logger = await app.resolve(LogService);
    logger.setContext(MicroService.name);

    const description = config.get('description');
    const port = microConfig.port ?? DEFAULT_MICRO_PORT;

    const microserviceOptions = opts?.microserviceConfig?.microserviceOptions || {};
    const hybridOptions = { inheritAppConfig: toBool(microConfig.inheritAppConfig, true) };
    const microOptions: MicroserviceOptions = mergeDeep(microserviceOptions, {
      transport: Transport.RMQ,
      options: {
        urls: toArray<string>(microConfig.rabbitUrls),
        queue: microConfig.rabbitQueue,
        queueOptions: {
          durable: toBool(microConfig.rabbitDurable, false),
        },
      },
    });

    app.useGlobalGuards(...toArray(opts?.guards));
    app.useGlobalPipes(...toArray(opts?.pipes));
    app.useGlobalInterceptors(...toArray(opts?.interceptors));
    app.useGlobalFilters(...toArray(opts?.filters));

    await app.connectMicroservice(microOptions, hybridOptions);
    await app.startAllMicroservices();
    await app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      logger.info(`🚀 Service %s (%s) is running on %s`, description, microConfig.name, baseUrl);
    });
  }
}
