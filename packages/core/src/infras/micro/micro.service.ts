import fs from 'fs';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import glob from 'glob';
import { GlobalOptions } from '../../base';
import { ConfigService, ENV } from '../../config';
import { LogService } from '../../logger';
import { toArray, toInt } from '../../utils';
import { buildError, validateSync } from '../../validation';
import { MicroConfig, MicroTransport } from './micro.config';

export class MicroService {
  static async bootstrap(app: INestApplication, opts?: GlobalOptions) {
    const config = app.get(ConfigService);
    const logger = await app.resolve(LogService);
    logger.setContext(MicroService.name);

    const microConfig = config.parse(MicroConfig, 'micro');
    const configErrors = validateSync(microConfig);
    if (configErrors.length) {
      const formatError = buildError(configErrors);
      logger.error(Object.values(formatError).flat(), 'Microservice config errors');
      return;
    }

    const { port, microservices } = microConfig;

    app.useGlobalGuards(...toArray(opts?.guards));
    app.useGlobalPipes(...toArray(opts?.pipes));
    app.useGlobalInterceptors(...toArray(opts?.interceptors));
    app.useGlobalFilters(...toArray(opts?.filters));

    await Promise.all(
      Object.keys(microservices).map((trans: MicroTransport) =>
        this.connectMicroservice(app, trans, microservices[trans]),
      ),
    );

    await app.startAllMicroservices();
    await app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      const name = config.get('name').replace('@', '').replace('/', '-');
      const description = config.get('description');
      logger.info(`🚀 Service %s (%s) is running on %s`, description, name, baseUrl);
    });
  }

  static async connectMicroservice(
    app: INestApplication,
    transport: MicroTransport,
    options: Record<string, any>,
  ): Promise<INestMicroservice> {
    const config = app.get(ConfigService);
    const microConfig = config.parse(MicroConfig, 'micro');
    const { port, inheritAppConfig } = microConfig;
    const buildOptions: any = Object.assign({}, options);

    if (transport === MicroTransport.TCP) {
      Object.assign(buildOptions, {
        host: buildOptions.host || '0.0.0.0',
        port: toInt(buildOptions.port, port),
      });
    } else if (transport === MicroTransport.GRPC) {
      const filePattern = options?.filePattern ?? `${config.get('env') == ENV.DEV ? 'src' : 'dist'}/**/*.proto`;
      const files = glob.sync(filePattern);
      const packages = files.map(
        file =>
          fs
            .readFileSync(file)
            .toString()
            .match(/package (.*);/)[1],
      );
      Object.assign(buildOptions, {
        package: packages,
        url: `0.0.0.0:${port}`,
        protoPath: files,
      });
    }

    const microOptions: any = {
      transport: this.convertTransport(transport) as Transport,
      options: { ...buildOptions },
    };
    return app.connectMicroservice<MicroserviceOptions>(microOptions, { inheritAppConfig });
  }

  private static convertTransport(transport: MicroTransport): Transport {
    const transportMapping: { [key: string]: Transport } = {
      [MicroTransport.TCP]: Transport.TCP,
      [MicroTransport.RMQ]: Transport.RMQ,
      [MicroTransport.NATS]: Transport.NATS,
      [MicroTransport.REDIS]: Transport.REDIS,
      [MicroTransport.GRPC]: Transport.GRPC,
      [MicroTransport.MQTT]: Transport.MQTT,
      [MicroTransport.KAFKA]: Transport.KAFKA,
    };
    return transportMapping[transport] || Transport.TCP;
  }
}
