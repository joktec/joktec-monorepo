import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, initConfig } from './config';
import { CqrsModule, GatewayModule, MicroModule } from './infras';
import { createPinoHttp, LoggerModule } from './logger';
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
    MetricModule,
    CqrsModule,
    GatewayModule,
    MicroModule,
  ],
})
export class CoreModule {}
