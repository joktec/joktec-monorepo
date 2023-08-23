import {
  APP_FILTER,
  APP_INTERCEPTOR,
  CoreModule,
  GatewayExceptionsFilter,
  JwtModule,
  Module,
  ResponseInterceptor,
  TrackInterceptor,
} from '@joktec/core';
import { HttpModule } from '@joktec/http';
import { MailerModule } from '@joktec/mailer';
import { MongoModule } from '@joktec/mongo';
import { AppController } from './app.controller';
import { CategoryModule } from './modules';
import { ProductModule } from './modules/products';

@Module({
  controllers: [AppController],
  imports: [
    // Libs
    CoreModule,
    MongoModule,
    HttpModule,
    JwtModule,
    MailerModule,
    // FirebaseModule,
    // Module
    CategoryModule,
    ProductModule, // Microservice
    // FirebaseExampleModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TrackInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: GatewayExceptionsFilter },
  ],
})
export class AppModule {}
