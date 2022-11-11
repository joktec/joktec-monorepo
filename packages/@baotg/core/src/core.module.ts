import { Global, Module } from '@nestjs/common';
import { config, ConfigModule, ConfigService } from './config';
import { createPinoHttp, LoggerModule } from './log';
import { MetricModule } from './metric';
import { CqrsModule } from '@nestjs/cqrs';
import { GatewayModule } from './infras/gateway/gateway.module';
import { MicroModule } from './infras/micro/micro.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
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
