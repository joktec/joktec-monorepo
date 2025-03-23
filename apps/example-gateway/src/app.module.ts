import path from 'path';
import { CacheModule } from '@joktec/cacher';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  BullModule,
  ConfigModule,
  ConfigService,
  createPinoHttp,
  GatewayMetricMiddleware,
  GatewayModule,
  LoggerModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@joktec/core';
import { FirebaseModule } from '@joktec/firebase';
import { HttpModule } from '@joktec/http';
import { KafkaModule } from '@joktec/kafka';
import { RabbitModule } from '@joktec/rabbit';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { appConfigFactory } from './app.config';
import { DEFAULT_LOCALE } from './app.constant';
import { CustomExceptionFilter, CustomExpressInterceptor } from './common';
import { MainModule } from './modules/main.module';
import { RepositoryModule, SessionRepo, UserRepo } from './repositories';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfigFactory] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => createPinoHttp(cfg),
    }),
    GatewayModule.forRoot({ useJwt: true, metric: true, static: true }),
    BullModule.forRoot(),
    HttpModule,
    FirebaseModule,
    CacheModule,
    KafkaModule,
    RabbitModule,
    RepositoryModule,
    MainModule,
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LOCALE,
      loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      typesOutputPath: path.join(__dirname, '../src/i18n/i18n.generated.ts'),
      logging: false,
      resolvers: [
        { use: QueryResolver, options: ['lang', 'language'] },
        new HeaderResolver(['x-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [
    UserRepo,
    SessionRepo,
    { provide: APP_INTERCEPTOR, useClass: CustomExpressInterceptor },
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayMetricMiddleware).forRoutes('*');
  }
}
