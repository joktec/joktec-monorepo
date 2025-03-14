import path from 'path';
import { CacheModule } from '@joktec/cacher';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  ConfigModule,
  ConfigService,
  createPinoHttp,
  LoggerModule,
  MicroMetricInterceptor,
  MicroModule,
  Module,
} from '@joktec/core';
import { FirebaseModule } from '@joktec/firebase';
import { HttpModule } from '@joktec/http';
import { KafkaModule } from '@joktec/kafka';
import { NotifierModule } from '@joktec/notifier';
import { ScheduleModule } from '@nestjs/schedule';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { appConfigFactory } from './app.config';
import { LOCALE } from './app.constant';
import { CustomExceptionFilter } from './common';
import { MainModule } from './modules/main.module';
import { RepositoryModule } from './repositories';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfigFactory] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => createPinoHttp(cfg),
    }),
    MicroModule.forRoot({ metric: true }),
    ScheduleModule.forRoot(),
    HttpModule,
    FirebaseModule,
    // MailerModule,
    NotifierModule,
    CacheModule,
    KafkaModule,
    RepositoryModule,
    MainModule,
    I18nModule.forRoot({
      fallbackLanguage: LOCALE.KO,
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
    { provide: APP_INTERCEPTOR, useClass: MicroMetricInterceptor },
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {}
