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
import { GptModule } from '@joktec/gpt';
import { HttpModule } from '@joktec/http';
import { MailerModule } from '@joktec/mailer';
import { MongoModule } from '@joktec/mongo';
import { StorageModule } from '@joktec/storage';
import { CustomExceptionFilter } from './base/custom-exception.filter';
import { MainModule } from './modules/main.module';

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
    GptModule,
    CacheModule,
    MainModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {}
