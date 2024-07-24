import path from 'path';
import { CacheModule } from '@joktec/cacher';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  BullModule,
  ConfigModule,
  ConfigService,
  createPinoHttp,
  GatewayModule,
  initConfig,
  JwtModule,
  LoggerModule,
  Module,
} from '@joktec/core';
import { FirebaseModule } from '@joktec/firebase';
import { HttpModule } from '@joktec/http';
import { MailerModule } from '@joktec/mailer';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { CustomExceptionFilter, CustomExpressInterceptor } from './base';
import { MainModule } from './modules/main.module';
import { RepositoryModule, SessionRepo, UserRepo } from './repositories';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [initConfig] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => createPinoHttp(cfg),
    }),
    GatewayModule,
    HttpModule,
    JwtModule,
    MailerModule,
    BullModule,
    FirebaseModule,
    CacheModule,
    RepositoryModule,
    MainModule,
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
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
export class AppModule {}
