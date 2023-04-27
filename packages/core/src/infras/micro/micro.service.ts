import { INestApplication, NestHybridApplicationOptions } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService, ENV } from '../../config';
import { DEFAULT_MICRO_PORT, MicroConfig } from './micro.config';
import { LogService } from '../../log';
import { toArray, toBool } from '../../utils';
import { GlobalOptions } from '../../base';
import glob from 'glob';
import fs from 'fs';

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

    const hybridOptions = { inheritAppConfig: toBool(microConfig.inheritAppConfig, true) };
    await Promise.all([
      this.connectTcp(app, hybridOptions),
      this.connectGrpc(app, hybridOptions),
      // this.connectHybird(app),
    ]);

    await app.startAllMicroservices();
    await app.listen(port, () => {
      const baseUrl = `http://localhost:${port}`;
      const name = config.get('name').replace('@', '').replace('/', '-');
      const description = config.get('description');
      logger.info(`🚀 Service %s (%s) is running on %s`, description, name, baseUrl);
    });
  }

  private static async connectTcp(app: INestApplication, hybridOptions?: NestHybridApplicationOptions) {
    const config = app.get(ConfigService);
    const microConfig: MicroConfig = config.get<MicroConfig>('micro' as any);
    if (!microConfig.tcp) return;
    await app.connectMicroservice(
      {
        transport: Transport.TCP,
        options: {
          ...microConfig.tcp,
          host: microConfig.tcp.host ?? '0.0.0.0',
          port: microConfig.tcp.port ?? microConfig.port ?? DEFAULT_MICRO_PORT,
        },
      },
      hybridOptions,
    );
  }

  private static async connectGrpc(app: INestApplication, hybridOptions?: NestHybridApplicationOptions) {
    const config = app.get(ConfigService);
    const microConfig: MicroConfig = config.get<MicroConfig>('micro' as any);
    if (!microConfig.gRPC) return;
    const filePattern = microConfig.gRPC.filePattern ?? `${config.get('env') == ENV.DEV ? 'src' : 'dist'}/**/*.proto`;
    const files = glob.sync(filePattern);
    const packages = files.map(
      file =>
        fs
          .readFileSync(file)
          .toString()
          .match(/package (.*);/)[1],
    );
    await app.connectMicroservice(
      {
        transport: Transport.GRPC,
        options: {
          package: packages,
          url: `0.0.0.0:${microConfig.port}`,
          protoPath: files,
        },
      },
      hybridOptions,
    );
  }

  // private static async connectHybird(app: INestApplication, builtInOptions: MicroserviceOptions[] = []) {
  //   const config = app.get(ConfigService);
  //   const microConfig: MicroConfig = config.get<MicroConfig>('micro' as any);
  //   const microserviceOptions = [...builtInOptions, ...(microConfig.microserviceOptions || [])];
  //   const hybridOptions = { inheritAppConfig: toBool(microConfig.inheritAppConfig, true) };
  //   await Promise.all(
  //     microserviceOptions.map(options => app.connectMicroservice<MicroserviceOptions>(options, hybridOptions)),
  //   );
  // }
}
