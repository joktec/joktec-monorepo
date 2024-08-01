import {
  APP_FILTER,
  ConfigModule,
  ConfigService,
  createPinoHttp,
  initConfig,
  LoggerModule,
  MicroExceptionFilter,
  MicroMetricMiddleware,
  MicroModule,
  MiddlewareConsumer,
  Module,
  NestModule,
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
    MicroModule.forRoot({ metric: true }),
    MysqlModule,
    ProductModule,
  ],
  providers: [{ provide: APP_FILTER, useValue: MicroExceptionFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MicroMetricMiddleware).forRoutes('*');
  }
}
