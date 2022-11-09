import {
  PushNotificationsGcmdeviceMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreatePushNotificationsGcmdeviceInput,
  UpdatePushNotificationsGcmdeviceInput,
  PushNotificationsGcmdeviceQueryInput,
  PushNotificationsGcmdeviceListReponse,
  PushNotificationsGcmdevice,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => PushNotificationsGcmdevice)
export class PushNotificationsGcmdeviceResolver extends BaseResolver<
  CreatePushNotificationsGcmdeviceInput,
  UpdatePushNotificationsGcmdeviceInput,
  PushNotificationsGcmdeviceQueryInput
>({
  viewDto: PushNotificationsGcmdevice,
  createInput: CreatePushNotificationsGcmdeviceInput,
  updateInput: UpdatePushNotificationsGcmdeviceInput,
  listQueryInput: PushNotificationsGcmdeviceQueryInput,
  listViewDto: PushNotificationsGcmdeviceListReponse,
  name: 'pushNotificationsGcmdevice',
  pluralName: 'pushNotificationsGcmdevices',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(notificationMicroservice, PushNotificationsGcmdeviceMessagePattern);
  }
}
