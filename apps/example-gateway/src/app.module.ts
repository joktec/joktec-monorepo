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
import { MongoModule } from '@joktec/mongo';
import { StorageModule } from '@joktec/storage';
import { CustomExceptionFilter } from './base/custom-exception.filter';
import { MainModule } from './modules/main.module';
import { SessionRepo } from './modules/sessions';
import { UserRepo } from './modules/users';
import { RepositoryModule } from './repositories';

@Module({
  imports: [
    CoreModule,
    MongoModule,
    StorageModule,
    HttpModule,
    JwtModule,
    MailerModule,
    BullModule,
    FirebaseModule,
    CacheModule,
    RepositoryModule,
    MainModule,
  ],
  providers: [
    UserRepo,
    SessionRepo,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {}
