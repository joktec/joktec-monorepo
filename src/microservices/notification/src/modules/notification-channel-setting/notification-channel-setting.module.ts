import {
  NotificationChannelSetting,
  NotificationChannelSettingSchema,
} from './schemas/notification-channel-setting.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NotificationChannelSettingService } from './notification-channel-setting.service';
import { NotificationChannelSettingController } from './notification-channel-setting.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NotificationChannelSetting.name,
        schema: NotificationChannelSettingSchema,
      },
    ]),
  ],
  controllers: [NotificationChannelSettingController],
  providers: [NotificationChannelSettingService],
})
export class NotificationChannelSettingModule {}
