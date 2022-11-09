import {
  JobMicroserviceConfig,
  JobhopJobAtsActivityMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopJobAtsActivity,
  JobhopJobAtsActivityListResponse,
  JobhopJobAtsActivityQueryInput,
  UpdateJobhopJobAtsActivityInput,
  CreateJobhopJobAtsActivityInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopJobAtsActivity)
export class JobhopJobAtsActivityResolver extends BaseResolver<
  CreateJobhopJobAtsActivityInput,
  UpdateJobhopJobAtsActivityInput,
  JobhopJobAtsActivityQueryInput
>({
  viewDto: JobhopJobAtsActivity,
  createInput: CreateJobhopJobAtsActivityInput,
  updateInput: UpdateJobhopJobAtsActivityInput,
  listQueryInput: JobhopJobAtsActivityQueryInput,
  listViewDto: JobhopJobAtsActivityListResponse,
  name: 'jobhopJobAtsActivity',
  pluralName: 'jobhopJobAtsActivities',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopJobAtsActivityMessagePattern);
  }
}
