import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, initConfig } from './config';
import { createPinoHttp, LoggerModule } from './log';
import { MetricModule } from './metric';
import { CqrsModule, GatewayModule, MicroModule } from './infras';

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
