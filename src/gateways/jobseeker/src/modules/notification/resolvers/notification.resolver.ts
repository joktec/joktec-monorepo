import {
  NotificationMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateNotificationInput,
  UpdateNotificationInput,
  NotificationQueryInput,
  NotificationListReponse,
  Notification,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => Notification)
export class NotificationResolver extends BaseResolver<
  CreateNotificationInput,
  UpdateNotificationInput,
  NotificationQueryInput
>({
  viewDto: Notification,
  createInput: CreateNotificationInput,
  updateInput: UpdateNotificationInput,
  listQueryInput: NotificationQueryInput,
  listViewDto: NotificationListReponse,
  name: 'notification',
  pluralName: 'notifications',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(notificationMicroservice, NotificationMessagePattern);
  }
}
