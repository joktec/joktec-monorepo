import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSettingService } from './user-settings.service';
import { UserSettingController } from './user-settings.controller';
import { UserSetting, UserSettingSchema } from './schemas/user-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSetting.name, schema: UserSettingSchema },
    ]),
  ],
  providers: [UserSettingService],
  controllers: [UserSettingController],
  exports: [UserSettingService],
})
export class UserSettingModule {}
