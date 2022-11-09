import {
  NotiMessageMessagePattern,
  NotificationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateNotiMessageInput,
  UpdateNotiMessageInput,
  NotiMessageQueryInput,
  NotiMessageListReponse,
  NotiMessage,
} from '@jobhopin/graphql';

const notificationMicroserviceConfig = new NotificationMicroserviceConfig();

@Resolver(() => NotiMessage)
export class NotiMessageResolver extends BaseResolver<
  CreateNotiMessageInput,
  UpdateNotiMessageInput,
  NotiMessageQueryInput
>({
  viewDto: NotiMessage,
  createInput: CreateNotiMessageInput,
  updateInput: UpdateNotiMessageInput,
  listQueryInput: NotiMessageQueryInput,
  listViewDto: NotiMessageListReponse,
  name: 'notiMessage',
  pluralName: 'notiMessages',
}) {
  constructor(
    @Inject(notificationMicroserviceConfig.name)
    private readonly notificationMicroservice: ClientProxy,
  ) {
    super(notificationMicroservice, NotiMessageMessagePattern);
  }
}
