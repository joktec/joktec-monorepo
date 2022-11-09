import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobInput,
  Job,
  JobListResponse,
  JobQueryInput,
  UpdateJobInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => Job)
export class JobResolver extends BaseResolver<
  CreateJobInput,
  UpdateJobInput,
  JobQueryInput
>({
  viewDto: Job,
  createInput: CreateJobInput,
  updateInput: UpdateJobInput,
  listQueryInput: JobQueryInput,
  listViewDto: JobListResponse,
  name: 'job',
  pluralName: 'jobs',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
