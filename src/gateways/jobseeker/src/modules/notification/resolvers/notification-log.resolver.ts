import {
  NotificationLogMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateNotificationLogInput,
  UpdateNotificationLogInput,
  NotificationLogQueryInput,
  NotificationLogListReponse,
  NotificationLog,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => NotificationLog)
export class NotificationLogResolver extends BaseResolver<
  CreateNotificationLogInput,
  UpdateNotificationLogInput,
  NotificationLogQueryInput
>({
  viewDto: NotificationLog,
  createInput: CreateNotificationLogInput,
  updateInput: UpdateNotificationLogInput,
  listQueryInput: NotificationLogQueryInput,
  listViewDto: NotificationLogListReponse,
  name: 'notificationLog',
  pluralName: 'notificationLogs',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(notificationMicroservice, NotificationLogMessagePattern);
  }
}
