import {
  JobMicroserviceConfig,
  JobhopScoreNotificationMissingFieldsMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopScoreNotificationMissingFieldsInput,
  JobhopScoreNotificationMissingFields,
  JobhopScoreNotificationMissingFieldsListResponse,
  JobhopScoreNotificationMissingFieldsQueryInput,
  UpdateJobhopScoreNotificationMissingFieldsInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopScoreNotificationMissingFields)
export class JobhopScoreNotificationMissingFieldsResolver extends BaseResolver<
  CreateJobhopScoreNotificationMissingFieldsInput,
  UpdateJobhopScoreNotificationMissingFieldsInput,
  JobhopScoreNotificationMissingFieldsQueryInput
>({
  viewDto: JobhopScoreNotificationMissingFields,
  createInput: CreateJobhopScoreNotificationMissingFieldsInput,
  updateInput: UpdateJobhopScoreNotificationMissingFieldsInput,
  listQueryInput: JobhopScoreNotificationMissingFieldsQueryInput,
  listViewDto: JobhopScoreNotificationMissingFieldsListResponse,
  name: 'jobhopScoreNotificationMissingFields',
  pluralName: 'jobhopScoreNotificationMissingFieldses',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopScoreNotificationMissingFieldsMessagePattern);
  }
}
