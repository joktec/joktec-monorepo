import {
  JobMicroserviceConfig,
  JobhopScoreNotificationMissingFieldMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopScoreNotificationMissingFieldInput,
  JobhopScoreNotificationMissingField,
  JobhopScoreNotificationMissingFieldListResponse,
  JobhopScoreNotificationMissingFieldQueryInput,
  UpdateJobhopScoreNotificationMissingFieldInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopScoreNotificationMissingField)
export class JobhopScoreNotificationMissingFieldResolver extends BaseResolver<
  CreateJobhopScoreNotificationMissingFieldInput,
  UpdateJobhopScoreNotificationMissingFieldInput,
  JobhopScoreNotificationMissingFieldQueryInput
>({
  viewDto: JobhopScoreNotificationMissingField,
  createInput: CreateJobhopScoreNotificationMissingFieldInput,
  updateInput: UpdateJobhopScoreNotificationMissingFieldInput,
  listQueryInput: JobhopScoreNotificationMissingFieldQueryInput,
  listViewDto: JobhopScoreNotificationMissingFieldListResponse,
  name: 'jobhopScoreNotificationMissingField',
  pluralName: 'jobhopScoreNotificationMissingFieldss',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopScoreNotificationMissingFieldMessagePattern);
  }
}
