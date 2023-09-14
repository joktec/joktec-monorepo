import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  BullModule,
  CoreModule,
  GatewayExceptionsFilter,
  JwtModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  ResponseInterceptor,
} from '@joktec/core';
import { FirebaseModule } from '@joktec/firebase';
import { HttpModule } from '@joktec/http';
import { MailerModule } from '@joktec/mailer';
import { MongoModule } from '@joktec/mongo';
import { StorageModule } from '@joktec/storage';
import { AuthMiddleware, RoleGuard } from './base';
import { ApartmentController, ApartmentModule } from './modules/apartments';
import { AssetController, AssetModule } from './modules/assets';
import { AuthModule } from './modules/auth';
import { CategoryModule } from './modules/categories';
import { OrderController, OrderModule } from './modules/orders';
import { OtpModule } from './modules/otpLogs';
import { ProductModule } from './modules/products';
import { ProfileController, ProfileModule } from './modules/profile';
import { RoomController, RoomModule } from './modules/rooms';
import { SessionController, SessionModule } from './modules/sessions';
import { SettingController, SettingModule } from './modules/settings';
import { UserController, UserModule } from './modules/users';

@Module({
  imports: [
    // Libs
    CoreModule,
    MongoModule,
    StorageModule,
    HttpModule,
    JwtModule,
    MailerModule,
    BullModule,
    FirebaseModule,
    // Module
    CategoryModule,
    ProductModule, // Microservice
    OtpModule,
    SessionModule,
    UserModule,
    AuthModule,
    ProfileModule,
    ApartmentModule,
    RoomModule,
    SettingModule,
    AssetModule,
    OrderModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: GatewayExceptionsFilter },
    { provide: APP_GUARD, useClass: RoleGuard },
    AuthMiddleware,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        UserController,
        ProfileController,
        ApartmentController,
        RoomController,
        AssetController,
        OrderController,
        SettingController,
        SessionController,
      );
  }
}
