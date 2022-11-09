import {
  JobMicroserviceConfig,
  JobhopUserActivityMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopUserActivityInput,
  JobhopUserActivity,
  JobhopUserActivityListResponse,
  JobhopUserActivityQueryInput,
  UpdateJobhopUserActivityInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopUserActivity)
export class JobhopUserActivityResolver extends BaseResolver<
  CreateJobhopUserActivityInput,
  UpdateJobhopUserActivityInput,
  JobhopUserActivityQueryInput
>({
  viewDto: JobhopUserActivity,
  createInput: CreateJobhopUserActivityInput,
  updateInput: UpdateJobhopUserActivityInput,
  listQueryInput: JobhopUserActivityQueryInput,
  listViewDto: JobhopUserActivityListResponse,
  name: 'jobhopUserActivity',
  pluralName: 'jobhopUserActivities',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopUserActivityMessagePattern);
  }
}
