import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, initConfig } from './config';
import { GatewayModule, MicroModule } from './infras';
import { createPinoHttp, LoggerModule } from './logger';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [initConfig] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => createPinoHttp(cfg),
    }),
    GatewayModule,
    MicroModule,
  ],
})
export class CoreModule {}
