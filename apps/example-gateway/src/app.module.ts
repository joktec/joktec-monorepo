import { BullModule, CoreModule, JwtModule, Module } from '@joktec/core';
import { FirebaseModule } from '@joktec/firebase';
import { HttpModule } from '@joktec/http';
import { MailerModule } from '@joktec/mailer';
import { MongoModule } from '@joktec/mongo';
import { StorageModule } from '@joktec/storage';
import { ApartmentModule } from './modules/apartments';
import { AssetModule } from './modules/assets';
import { AuthModule } from './modules/auth';
import { CategoryModule } from './modules/categories';
import { OrderModule } from './modules/orders';
import { OtpModule } from './modules/otpLogs';
import { ProductModule } from './modules/products';
import { ProfileModule } from './modules/profile';
import { RoomModule } from './modules/rooms';
import { SessionModule } from './modules/sessions';
import { SettingModule } from './modules/settings';
import { UserModule } from './modules/users';

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
    UserModule,
    SessionModule,
    CategoryModule,
    ProductModule, // Microservice
    OtpModule,
    AuthModule,
    ProfileModule,
    ApartmentModule,
    RoomModule,
    SettingModule,
    AssetModule,
    OrderModule,
  ],
  providers: [
    // { provide: APP_FILTER, useClass: GatewayExceptionsFilter },
  ],
})
export class AppModule {}
