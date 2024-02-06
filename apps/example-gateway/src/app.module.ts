import path from 'path';
import { CacheModule } from '@joktec/cacher';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  BullModule,
  CoreModule,
  JwtModule,
  Module,
  ResponseInterceptor,
} from '@joktec/core';
import { FirebaseModule } from '@joktec/firebase';
import { HttpModule } from '@joktec/http';
import { MailerModule } from '@joktec/mailer';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { CustomExceptionFilter } from './base/custom-exception.filter';
import { CustomQueryInterceptor } from './base/custom-query.interceptor';
import { MainModule } from './modules/main.module';
import { RepositoryModule, SessionRepo, UserRepo } from './repositories';

@Module({
  imports: [
    CoreModule,
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
    { provide: APP_INTERCEPTOR, useClass: CustomQueryInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {}
