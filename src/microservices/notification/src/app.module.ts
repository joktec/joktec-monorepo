import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationChannelSettingModule } from './modules/notification-channel-setting/notification-channel-setting.module';
import { NotificationLogModule } from './modules/notification-log/notification-log.module';
import { NotiMessageModule } from './modules/noti-message/noti-message.module';
import { PushNotificationsApnsdeviceModule } from './modules/push-notifications-apnsdevice/push-notifications-apnsdevice.module';
import { PushNotificationsGcmdeviceModule } from './modules/push-notifications-gcmdevice/push-notifications-gcmdevice.module';
import { PushNotificationsWebpushdeviceModule } from './modules/push-notifications-webpushdevice/push-notifications-webpushdevice.module';
import { PushNotificationsWnsdeviceModule } from './modules/push-notifications-wnsdevice/push-notifications-wnsdevice.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.NOTIFICATION_SERVICE_MONGODB_URL),
    HealthModule,
    NotificationModule,
    NotificationChannelSettingModule,
    NotificationLogModule,
    NotiMessageModule,
    PushNotificationsApnsdeviceModule,
    PushNotificationsGcmdeviceModule,
    PushNotificationsWebpushdeviceModule,
    PushNotificationsWnsdeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
