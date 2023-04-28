import { INestApplication, INestMicroservice } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService, ENV } from '../../config';
import { DEFAULT_MICRO_PORT, MicroConfig, MicroTransport } from './micro.config';
import { LogService } from '../../log';
import { toArray, toBool } from '../../utils';
import { GlobalOptions } from '../../base';
import glob from 'glob';
import fs from 'fs';
import mergeDeep from 'merge-deep';

export class MicroService {
  static async bootstrap(app: INestApplication, opts?: GlobalOptions) {
    const config = app.get(ConfigService);
    const microConfig: MicroConfig = config.get<MicroConfig>('micro' as any);
    if (!microConfig) return;

    const logger = await app.resolve(LogService);
    logger.setContext(MicroService.name);

    const port = microConfig.port ?? DEFAULT_MICRO_PORT;

    app.useGlobalGuards(...toArray(opts?.guards));
    app.useGlobalPipes(...toArray(opts?.pipes));
    app.useGlobalInterceptors(...toArray(opts?.interceptors));
    app.useGlobalFilters(...toArray(opts?.filters));

    await Promise.all(
      Object.keys(microConfig.microservices).map(async (transport: MicroTransport) => {
        const options = microConfig.microservices[transport];
        await this.connectMicroservice(app, transport, options);
      }),
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
    const microConfig: MicroConfig = config.get<MicroConfig>('micro' as any);
    const hybridOptions = { inheritAppConfig: toBool(microConfig.inheritAppConfig, true) };
    const buildOptions: any = Object.assign({}, options);

    if (transport === MicroTransport.TCP) {
      Object.assign(buildOptions, {
        host: buildOptions.host || '0.0.0.0',
        port: buildOptions.port || microConfig.port || DEFAULT_MICRO_PORT,
      });
      console.log('buildOptions', JSON.stringify(buildOptions, null, 4));
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
      Object.assign(buildOptions, { package: packages, url: `0.0.0.0:${microConfig.port}`, protoPath: files });
    }

    const microOptions: any = {
      transport: this.convertTransport(transport) as Transport,
      options: { ...buildOptions },
    };
    return app.connectMicroservice<MicroserviceOptions>(microOptions, hybridOptions);
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
