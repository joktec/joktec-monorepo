import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService, initConfig } from './config';
import { createPinoHttp, LoggerModule } from './log';
import { MetricModule } from './metric';
import { CqrsModule, GatewayConfig, GatewayModule, MicroModule } from './infras';
import path from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [initConfig] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => createPinoHttp(cfg),
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const gatewayConfig = cfg.get<GatewayConfig>('gateway');
        return [{ rootPath: path.resolve(gatewayConfig.staticPath || './public') }];
      },
    }),
    MetricModule,
    CqrsModule,
    GatewayModule,
    MicroModule,
  ],
})
export class CoreModule {}
