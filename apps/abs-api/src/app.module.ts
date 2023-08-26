import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  BullModule,
  CoreModule,
  JwtModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  ResponseInterceptor,
} from '@joktec/core';
import { HttpModule } from '@joktec/http';
import { MongoModule } from '@joktec/mongo';
import { StorageModule } from '@joktec/storage';
import { AuthMiddleware, HttpExceptionFilter, RoleGuard } from './base';
import { ApartmentController, ApartmentModule } from './modules/apartments';
import { AssetController, AssetModule } from './modules/assets';
import { AuthModule } from './modules/auth';
import { OrderController, OrderModule } from './modules/orders';
import { OtpModule } from './modules/otpLogs';
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
    BullModule,
    // Modules
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
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: RoleGuard },
    AuthMiddleware,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(ApartmentController.excludeRoute(), RoomController.excludeRoute(), SettingController.excludeRoute())
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
