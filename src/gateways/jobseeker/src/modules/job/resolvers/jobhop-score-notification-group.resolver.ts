import {
  JobMicroserviceConfig,
  JobhopScoreNotificationGroupMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopScoreNotificationGroupInput,
  JobhopScoreNotificationGroup,
  JobhopScoreNotificationGroupListResponse,
  JobhopScoreNotificationGroupQueryInput,
  UpdateJobhopScoreNotificationGroupInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopScoreNotificationGroup)
export class JobhopScoreNotificationGroupResolver extends BaseResolver<
  CreateJobhopScoreNotificationGroupInput,
  UpdateJobhopScoreNotificationGroupInput,
  JobhopScoreNotificationGroupQueryInput
>({
  viewDto: JobhopScoreNotificationGroup,
  createInput: CreateJobhopScoreNotificationGroupInput,
  updateInput: UpdateJobhopScoreNotificationGroupInput,
  listQueryInput: JobhopScoreNotificationGroupQueryInput,
  listViewDto: JobhopScoreNotificationGroupListResponse,
  name: 'jobhopScoreNotificationGroup',
  pluralName: 'jobhopScoreNotificationGroups',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopScoreNotificationGroupMessagePattern);
  }
}
