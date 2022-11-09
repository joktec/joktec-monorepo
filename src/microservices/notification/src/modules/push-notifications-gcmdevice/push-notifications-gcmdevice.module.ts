import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PushNotificationsGcmdeviceService } from './push-notifications-gcmdevice.service';
import { PushNotificationsGcmdeviceController } from './push-notifications-gcmdevice.controller';
import {
  PushNotificationsGcmdevice,
  PushNotificationsGcmdeviceSchema,
} from './schemas/push-notifications-gcmdevice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PushNotificationsGcmdevice.name,
        schema: PushNotificationsGcmdeviceSchema,
      },
    ]),
  ],
  controllers: [PushNotificationsGcmdeviceController],
  providers: [PushNotificationsGcmdeviceService],
})
export class PushNotificationsGcmdeviceModule {}
