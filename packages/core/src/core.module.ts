import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService, initConfig } from './config';
import { createPinoHttp, LoggerModule } from './log';
import { CqrsModule, GatewayConfig, GatewayModule, MicroModule } from './infras';
import path from 'path';
import { MetricModule } from './metric';

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
        const { staticPath = './public', excludePath = [] } = gatewayConfig?.static || {};
        return [{ rootPath: path.resolve(staticPath), exclude: [...excludePath] }];
      },
    }),
    MetricModule,
    CqrsModule,
    GatewayModule,
    MicroModule,
  ],
})
export class CoreModule {}
