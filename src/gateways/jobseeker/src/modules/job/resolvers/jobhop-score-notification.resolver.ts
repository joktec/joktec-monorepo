import {
  JobMicroserviceConfig,
  JobhopScoreNotificationMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopScoreNotificationInput,
  JobhopScoreNotification,
  JobhopScoreNotificationListResponse,
  JobhopScoreNotificationQueryInput,
  UpdateJobhopScoreNotificationInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopScoreNotification)
export class JobhopScoreNotificationResolver extends BaseResolver<
  CreateJobhopScoreNotificationInput,
  UpdateJobhopScoreNotificationInput,
  JobhopScoreNotificationQueryInput
>({
  viewDto: JobhopScoreNotification,
  createInput: CreateJobhopScoreNotificationInput,
  updateInput: UpdateJobhopScoreNotificationInput,
  listQueryInput: JobhopScoreNotificationQueryInput,
  listViewDto: JobhopScoreNotificationListResponse,
  name: 'jobhopScoreNotification',
  pluralName: 'jobhopScoreNotifications',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopScoreNotificationMessagePattern);
  }
}
