import { Global, Module } from '@nestjs/common';
import { GatewayModule, MicroModule } from './infras';
import { ConfigModule, ConfigService, createPinoHttp, initConfig, LoggerModule } from './modules';

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
