import { HealthModule } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AccountGroupModule,
  AccountUserGroupModule,
  UserActionModule,
  UserActivationModule,
  UserCvModule,
  UserCvTemplateModule,
  UserEmailVerificationModule,
  UserLocationModule,
  UserModule,
  UserPlatformModule,
  UserSettingModule,
  UserTalentKeywordModule,
} from '@app/modules';

@Module({
  imports: [
    AccountGroupModule,
    AccountUserGroupModule,
    HealthModule,
    UserModule,
    UserActionModule,
    UserCvTemplateModule,
    UserCvModule,
    UserEmailVerificationModule,
    UserLocationModule,
    UserPlatformModule,
    UserSettingModule,
    UserActivationModule,
    UserTalentKeywordModule,
    MongooseModule.forRoot(process.env.USER_SERVICE_MONGODB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
