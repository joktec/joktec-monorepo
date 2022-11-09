import {
  JobMicroserviceConfig,
  JobhopUserScoreSentNotificationMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopUserScoreSentNotificationInput,
  JobhopUserScoreSentNotification,
  JobhopUserScoreSentNotificationListResponse,
  JobhopUserScoreSentNotificationQueryInput,
  UpdateJobhopUserScoreSentNotificationInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopUserScoreSentNotification)
export class JobhopUserScoreSentNotificationResolver extends BaseResolver<
  CreateJobhopUserScoreSentNotificationInput,
  UpdateJobhopUserScoreSentNotificationInput,
  JobhopUserScoreSentNotificationQueryInput
>({
  viewDto: JobhopUserScoreSentNotification,
  createInput: CreateJobhopUserScoreSentNotificationInput,
  updateInput: UpdateJobhopUserScoreSentNotificationInput,
  listQueryInput: JobhopUserScoreSentNotificationQueryInput,
  listViewDto: JobhopUserScoreSentNotificationListResponse,
  name: 'jobhopUserScoreSentNotification',
  pluralName: 'jobhopUserScoreSentNotifications',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopUserScoreSentNotificationMessagePattern);
  }
}
