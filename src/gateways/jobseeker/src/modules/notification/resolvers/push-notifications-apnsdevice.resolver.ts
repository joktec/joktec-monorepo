import {
  PushNotificationsApnsdeviceMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreatePushNotificationsApnsdeviceInput,
  UpdatePushNotificationsApnsdeviceInput,
  PushNotificationsApnsdeviceQueryInput,
  PushNotificationsApnsdeviceListReponse,
  PushNotificationsApnsdevice,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => PushNotificationsApnsdevice)
export class PushNotificationsApnsdeviceResolver extends BaseResolver<
  CreatePushNotificationsApnsdeviceInput,
  UpdatePushNotificationsApnsdeviceInput,
  PushNotificationsApnsdeviceQueryInput
>({
  viewDto: PushNotificationsApnsdevice,
  createInput: CreatePushNotificationsApnsdeviceInput,
  updateInput: UpdatePushNotificationsApnsdeviceInput,
  listQueryInput: PushNotificationsApnsdeviceQueryInput,
  listViewDto: PushNotificationsApnsdeviceListReponse,
  name: 'pushNotificationsApnsdevice',
  pluralName: 'pushNotificationsApnsdevices',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(notificationMicroservice, PushNotificationsApnsdeviceMessagePattern);
  }
}
