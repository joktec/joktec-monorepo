import { Global, Module } from '@joktec/core';
import { ApartmentModule } from './apartments';
import { AssetModule } from './assets';
import { AuthModule } from './auth';
import { CategoryModule } from './categories';
import { OrderModule } from './orders';
import { OtpModule } from './otpLogs';
import { PlaceModule } from './places';
import { ProductModule } from './products';
import { ProfileModule } from './profile';
import { RoomModule } from './rooms';
import { SessionModule } from './sessions';
import { SettingModule } from './settings';
import { UserModule } from './users';

@Global()
@Module({
  imports: [
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
    PlaceModule,
  ],
})
export class MainModule {}
