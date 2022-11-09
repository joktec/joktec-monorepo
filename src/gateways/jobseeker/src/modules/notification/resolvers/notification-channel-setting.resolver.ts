import {
  NotificationChannelSettingMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateNotificationChannelSettingInput,
  UpdateNotificationChannelSettingInput,
  NotificationChannelSettingQueryInput,
  NotificationChannelSettingListReponse,
  NotificationChannelSetting,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => NotificationChannelSetting)
export class NotificationChannelSettingResolver extends BaseResolver<
  CreateNotificationChannelSettingInput,
  UpdateNotificationChannelSettingInput,
  NotificationChannelSettingQueryInput
>({
  viewDto: NotificationChannelSetting,
  createInput: CreateNotificationChannelSettingInput,
  updateInput: UpdateNotificationChannelSettingInput,
  listQueryInput: NotificationChannelSettingQueryInput,
  listViewDto: NotificationChannelSettingListReponse,
  name: 'notificatonChannelSetting',
  pluralName: 'notificatonChannelSettings',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(notificationMicroservice, NotificationChannelSettingMessagePattern);
  }
}
