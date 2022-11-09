import {
  JobMicroserviceConfig,
  JobGroupJobsMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobGroupJobs,
  JobGroupJobsListResponse,
  JobGroupJobsQueryInput,
  UpdateJobGroupJobsInput,
  CreateJobGroupJobsInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobGroupJobs)
export class JobGroupJobsResolver extends BaseResolver<
  CreateJobGroupJobsInput,
  UpdateJobGroupJobsInput,
  JobGroupJobsQueryInput
>({
  viewDto: JobGroupJobs,
  createInput: CreateJobGroupJobsInput,
  updateInput: UpdateJobGroupJobsInput,
  listQueryInput: JobGroupJobsQueryInput,
  listViewDto: JobGroupJobsListResponse,
  name: 'jobGroupJobs',
  pluralName: 'jobGroupJobss',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobGroupJobsMessagePattern);
  }
}
