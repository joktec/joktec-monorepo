import fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import glob from 'glob';
import { GlobalOptions } from '../../base';
import { ConfigService, ENV } from '../../config';
import { LogService } from '../../logger';
import { toArray, toInt } from '../../utils';
import { MicroConfig, MicroOptions, MicroTransport } from './micro.config';

export class MicroService {
  static async bootstrap(app: INestApplication, opts?: GlobalOptions) {
    const config = app.get(ConfigService);
    const logger = await app.resolve(LogService);
    logger.setContext(MicroService.name);

    const microConfig = config.parseOrThrow(MicroConfig, 'micro');
    const { port, inheritAppConfig, microservices } = microConfig;

    app.useGlobalGuards(...toArray(opts?.guards));
    app.useGlobalPipes(...toArray(opts?.pipes));
    app.useGlobalInterceptors(...toArray(opts?.interceptors));
    app.useGlobalFilters(...toArray(opts?.filters));

    this.connectMicroservice(app, microservices).flatMap(opts => {
      logger.info('Transport %s: %j', Transport[opts['transport']], opts);
      app.connectMicroservice(opts, { inheritAppConfig });
    });

    await app.startAllMicroservices();
    await app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      const name = config.get('name').replace('@', '').replace('/', '-');
      const description = config.get('description');
      logger.info(`🚀 Service %s (%s) is running on %s`, description, name, baseUrl);
    });
  }

  static connectMicroservice(app: INestApplication, opts: MicroOptions): MicroserviceOptions[] {
    const config = app.get(ConfigService);
    const microConfig = config.parse(MicroConfig, 'micro');
    const { port } = microConfig;

    if (opts?.[MicroTransport.GRPC]) {
      return toArray(opts?.[MicroTransport.GRPC]).map(options => {
        const filePattern = options?.filePattern ?? `${config.get('env') == ENV.DEV ? 'src' : 'dist'}/**/*.proto`;
        const protoPath = glob.sync(filePattern);
        const packages = protoPath.map(
          file =>
            fs
              .readFileSync(file)
              .toString()
              .match(/package (.*);/)[1],
        );
        return {
          transport: Transport.GRPC,
          options: { package: packages, url: `0.0.0.0:${port}`, protoPath, ...options },
        };
      });
    }

    if (opts?.[MicroTransport.TCP]) {
      return toArray(opts?.[MicroTransport.TCP]).map(options => {
        return {
          transport: Transport.TCP,
          options: { host: options?.host || '0.0.0.0', port: toInt(options?.port, port), ...options },
        };
      });
    }

    if (opts?.[MicroTransport.RMQ]) {
      return toArray(opts?.[MicroTransport.RMQ]).map(options => {
        return { transport: Transport.RMQ, options: { ...options } };
      });
    }

    if (opts?.[MicroTransport.NATS]) {
      return toArray(opts?.[MicroTransport.NATS]).map(options => {
        return { transport: Transport.NATS, options: { ...options } };
      });
    }

    if (opts?.[MicroTransport.MQTT]) {
      return toArray(opts?.[MicroTransport.MQTT]).map(options => {
        return { transport: Transport.MQTT, options: { ...options } };
      });
    }

    if (opts?.[MicroTransport.KAFKA]) {
      return toArray(opts?.[MicroTransport.KAFKA]).map(options => {
        return { transport: Transport.KAFKA, options: { ...options } };
      });
    }

    return [];
  }
}
