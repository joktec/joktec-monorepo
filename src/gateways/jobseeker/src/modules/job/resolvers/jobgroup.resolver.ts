import { JobMicroserviceConfig, JobGroupMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  JobGroup,
  JobGroupListResponse,
  JobGroupQueryInput,
  UpdateJobGroupInput,
  CreateJobGroupInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobGroup)
export class JobGroupResolver extends BaseResolver<
  CreateJobGroupInput,
  UpdateJobGroupInput,
  JobGroupQueryInput
>({
  viewDto: JobGroup,
  createInput: CreateJobGroupInput,
  updateInput: UpdateJobGroupInput,
  listQueryInput: JobGroupQueryInput,
  listViewDto: JobGroupListResponse,
  name: 'jobGroup',
  pluralName: 'jobGroups',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobGroupMessagePattern);
  }
}
