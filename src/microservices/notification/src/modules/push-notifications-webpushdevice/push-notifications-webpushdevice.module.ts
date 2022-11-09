import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PushNotificationsWebpushdeviceService } from './push-notifications-webpushdevice.service';
import { PushNotificationsWebpushdeviceController } from './push-notifications-webpushdevice.controller';
import {
  PushNotificationsWebpushdevice,
  PushNotificationsWebpushdeviceSchema,
} from './schemas/push-notifications-webpushdevice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PushNotificationsWebpushdevice.name,
        schema: PushNotificationsWebpushdeviceSchema,
      },
    ]),
  ],
  controllers: [PushNotificationsWebpushdeviceController],
  providers: [PushNotificationsWebpushdeviceService],
})
export class PushNotificationsWebpushdeviceModule {}
