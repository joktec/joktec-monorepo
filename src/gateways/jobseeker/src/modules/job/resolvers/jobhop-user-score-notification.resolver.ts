import {
  JobMicroserviceConfig,
  JobhopUserScoreNotificationMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopUserScoreNotificationInput,
  JobhopUserScoreNotification,
  JobhopUserScoreNotificationListResponse,
  JobhopUserScoreNotificationQueryInput,
  UpdateJobhopUserScoreNotificationInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopUserScoreNotification)
export class JobhopUserScoreNotificationResolver extends BaseResolver<
  CreateJobhopUserScoreNotificationInput,
  UpdateJobhopUserScoreNotificationInput,
  JobhopUserScoreNotificationQueryInput
>({
  viewDto: JobhopUserScoreNotification,
  createInput: CreateJobhopUserScoreNotificationInput,
  updateInput: UpdateJobhopUserScoreNotificationInput,
  listQueryInput: JobhopUserScoreNotificationQueryInput,
  listViewDto: JobhopUserScoreNotificationListResponse,
  name: 'jobhopUserScoreNotification',
  pluralName: 'jobhopUserScoreNotifications',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopUserScoreNotificationMessagePattern);
  }
}
