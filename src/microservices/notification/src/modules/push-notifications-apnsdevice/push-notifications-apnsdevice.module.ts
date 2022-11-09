import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PushNotificationsApnsdeviceService } from './push-notifications-apnsdevice.service';
import { PushNotificationsApnsdeviceController } from './push-notifications-apnsdevice.controller';
import {
  PushNotificationsApnsdevice,
  PushNotificationsApnsdeviceSchema,
} from './schemas/push-notifications-apnsdevice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PushNotificationsApnsdevice.name,
        schema: PushNotificationsApnsdeviceSchema,
      },
    ]),
  ],
  controllers: [PushNotificationsApnsdeviceController],
  providers: [PushNotificationsApnsdeviceService],
})
export class PushNotificationsApnsdeviceModule {}
