import {
  JobMicroserviceConfig,
  JobAiLysisMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobAiLysisInput,
  JobAiLysisListResponse,
  JobAiLysis,
  JobAiLysisQueryInput,
  UpdateJobAiLysisInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobAiLysis)
export class JobAiLysisResolver extends BaseResolver<
  CreateJobAiLysisInput,
  UpdateJobAiLysisInput,
  JobAiLysisQueryInput
>({
  viewDto: JobAiLysis,
  createInput: CreateJobAiLysisInput,
  updateInput: UpdateJobAiLysisInput,
  listQueryInput: JobAiLysisQueryInput,
  listViewDto: JobAiLysisListResponse,
  name: 'jobAiLysis',
  pluralName: 'jobAiLysises',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobAiLysisMessagePattern);
  }
}
