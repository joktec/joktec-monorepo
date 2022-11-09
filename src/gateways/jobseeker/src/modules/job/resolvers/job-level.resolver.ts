import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobLevelInput,
  JobLevel,
  JobLevelListResponse,
  JobLevelQueryInput,
  UpdateJobLevelInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobLevel)
export class JobLevelResolver extends BaseResolver<
  CreateJobLevelInput,
  UpdateJobLevelInput,
  JobLevelQueryInput
>({
  viewDto: JobLevel,
  createInput: CreateJobLevelInput,
  updateInput: UpdateJobLevelInput,
  listQueryInput: JobLevelQueryInput,
  listViewDto: JobLevelListResponse,
  name: 'jobLevel',
  pluralName: 'jobLevels',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
