import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PushNotificationsWnsdeviceService } from './push-notifications-wnsdevice.service';
import { PushNotificationsWnsdeviceController } from './push-notifications-wnsdevice.controller';
import {
  PushNotificationsWnsdevice,
  PushNotificationsWnsdeviceSchema,
} from './schemas/push-notifications-wnsdevice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PushNotificationsWnsdevice.name,
        schema: PushNotificationsWnsdeviceSchema,
      },
    ]),
  ],
  controllers: [PushNotificationsWnsdeviceController],
  providers: [PushNotificationsWnsdeviceService],
})
export class PushNotificationsWnsdeviceModule {}
