import {
  PushNotificationsWebpushdeviceMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreatePushNotificationsWebpushdeviceInput,
  UpdatePushNotificationsWebpushdeviceInput,
  PushNotificationsWebpushdeviceQueryInput,
  PushNotificationsWebpushdeviceListReponse,
  PushNotificationsWebpushdevice,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => PushNotificationsWebpushdevice)
export class PushNotificationsWebpushdeviceResolver extends BaseResolver<
  CreatePushNotificationsWebpushdeviceInput,
  UpdatePushNotificationsWebpushdeviceInput,
  PushNotificationsWebpushdeviceQueryInput
>({
  viewDto: PushNotificationsWebpushdevice,
  createInput: CreatePushNotificationsWebpushdeviceInput,
  updateInput: UpdatePushNotificationsWebpushdeviceInput,
  listQueryInput: PushNotificationsWebpushdeviceQueryInput,
  listViewDto: PushNotificationsWebpushdeviceListReponse,
  name: 'pushNotificationsWebpushdevice',
  pluralName: 'pushNotificationsWebpushdevices',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(
      notificationMicroservice,
      PushNotificationsWebpushdeviceMessagePattern,
    );
  }
}
