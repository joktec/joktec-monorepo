import { JobMicroserviceConfig, JobTypeMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  JobType,
  JobTypeListResponse,
  JobTypeQueryInput,
  UpdateJobTypeInput,
  CreateJobTypeInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobType)
export class JobTypeResolver extends BaseResolver<
  CreateJobTypeInput,
  UpdateJobTypeInput,
  JobTypeQueryInput
>({
  viewDto: JobType,
  createInput: CreateJobTypeInput,
  updateInput: UpdateJobTypeInput,
  listQueryInput: JobTypeQueryInput,
  listViewDto: JobTypeListResponse,
  name: 'jobType',
  pluralName: 'jobTypes',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobTypeMessagePattern);
  }
}
