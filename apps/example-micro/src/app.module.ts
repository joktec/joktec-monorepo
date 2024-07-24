import {
  APP_FILTER,
  ConfigModule,
  ConfigService,
  createPinoHttp,
  initConfig,
  LoggerModule,
  MicroExceptionFilter, MicroModule,
  Module,
} from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { ProductModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [initConfig] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => createPinoHttp(cfg),
    }),
    MysqlModule,
    MicroModule,
    ProductModule,
  ],
  providers: [{ provide: APP_FILTER, useValue: MicroExceptionFilter }],
})
export class AppModule {}
