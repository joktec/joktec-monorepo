import { NotificationMicroserviceConfig } from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { NotiMessageResolver } from './resolvers/noti-message.resolver';
import { NotificationChannelSettingResolver } from './resolvers/notification-channel-setting.resolver';
import { NotificationLogResolver } from './resolvers/notification-log.resolver';
import { NotificationResolver } from './resolvers/notification.resolver';
import { PushNotificationsGcmdeviceResolver } from './resolvers/pubsh-notifications-gcmdevice.resolver';
import { PushNotificationsApnsdeviceResolver } from './resolvers/push-notifications-apnsdevice.resolver';
import { PushNotificationsWebpushdeviceResolver } from './resolvers/push-notifications-webpushdevice.resolver';
import { PushNotificationsWnsdeviceResolver } from './resolvers/push-notifications-wnsdevice.resolver';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: notificationMicroserviceConfig.name,
        ...notificationMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],

  providers: [
    NotificationResolver,
    NotificationChannelSettingResolver,
    NotiMessageResolver,
    NotificationLogResolver,
    PushNotificationsApnsdeviceResolver,
    PushNotificationsGcmdeviceResolver,
    PushNotificationsWebpushdeviceResolver,
    PushNotificationsWnsdeviceResolver,
  ],
  controllers: [],
})
export class NotificationModule {}
