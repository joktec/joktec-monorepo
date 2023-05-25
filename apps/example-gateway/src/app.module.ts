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
import { MongoModule } from '@joktec/mongo';
import { CategoryModule } from './modules';
import { ProductModule } from './modules/products';
import { MailerModule } from '@joktec/mailer';

@Module({
  imports: [
    // Libs
    CoreModule,
    MongoModule,
    HttpModule,
    JwtModule,
    MailerModule,
    // Module
    CategoryModule,
    ProductModule, // Microservice
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TrackInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: GatewayExceptionsFilter },
  ],
})
export class AppModule {}
