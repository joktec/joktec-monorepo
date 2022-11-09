import {
  PushNotificationsWnsdeviceMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreatePushNotificationsWnsdeviceInput,
  UpdatePushNotificationsWnsdeviceInput,
  PushNotificationsWnsdeviceQueryInput,
  PushNotificationsWnsdeviceListReponse,
  PushNotificationsWnsdevice,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => PushNotificationsWnsdevice)
export class PushNotificationsWnsdeviceResolver extends BaseResolver<
  CreatePushNotificationsWnsdeviceInput,
  UpdatePushNotificationsWnsdeviceInput,
  PushNotificationsWnsdeviceQueryInput
>({
  viewDto: PushNotificationsWnsdevice,
  createInput: CreatePushNotificationsWnsdeviceInput,
  updateInput: UpdatePushNotificationsWnsdeviceInput,
  listQueryInput: PushNotificationsWnsdeviceQueryInput,
  listViewDto: PushNotificationsWnsdeviceListReponse,
  name: 'pushNotificationsWnsdevice',
  pluralName: 'pushNotificationsWnsdevices',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(notificationMicroservice, PushNotificationsWnsdeviceMessagePattern);
  }
}
