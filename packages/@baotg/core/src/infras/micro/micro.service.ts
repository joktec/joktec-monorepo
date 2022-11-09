import { ConfigService, ENV } from '@core/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroConfig } from '@core/infras';
import { getTransport } from './micro.utils';
import { DEFAULT_MICRO_PORT, MicroTransport } from '@core/infras/micro/micro.config';
import { NestHybridApplicationOptions } from '@nestjs/common/interfaces';
import { GrpcOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import glob = require('glob');
import fs = require('fs');

export class MicroService {
  static async bootstrap(app: INestApplication) {
    const config = app.get(ConfigService);
    const microConfig = config.get<MicroConfig>('micro' as any);
    if (!microConfig) return;

    const logger = new Logger('MicroService');

    const port = microConfig.port ?? DEFAULT_MICRO_PORT;
    const microOptions: MicroserviceOptions = MicroService.buildMicroserviceOptions(app);
    const hybridOptions: NestHybridApplicationOptions = { inheritAppConfig: true, ...microConfig.hybridOptions };

    await app.connectMicroservice<MicroserviceOptions>(microOptions, hybridOptions);
    app.useGlobalPipes(new ValidationPipe());
    await app.startAllMicroservices();
    await app.listen(port).then(() => logger.log(`Microservice is listening on port ${port}`));
  }

  private static buildMicroserviceOptions(app: INestApplication): MicroserviceOptions {
    const config = app.get(ConfigService);
    const microConfig = config.get<MicroConfig>('micro' as any);
    if (microConfig.transport === MicroTransport.GRPC) {
      return MicroService.buildGRPC(app);
    }

    return {
      strategy: undefined,
      transport: getTransport(microConfig.transport),
      options: { ...microConfig.microOptions.options },
    };
  }

  private static buildGRPC(app: INestApplication): GrpcOptions {
    const config = app.get(ConfigService);
    const microConfig = config.get<MicroConfig>('micro' as any);
    const port = microConfig.port ?? DEFAULT_MICRO_PORT;
    const files = glob.sync(`${config.get('env') == ENV.DEV ? 'src' : 'dist'}/**/*.proto`);
    const packages = files.map(
      file =>
        fs
          .readFileSync(file)
          .toString()
          .match(/package (.*);/)[1],
    );
    return {
      transport: Transport.GRPC,
      options: {
        package: packages,
        url: `0.0.0.0:${port}`,
        protoPath: files,
        ...(microConfig.microOptions.options as any),
      },
    };
  }
}
