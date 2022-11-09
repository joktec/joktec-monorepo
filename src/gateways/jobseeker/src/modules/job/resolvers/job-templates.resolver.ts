import {
  JobMicroserviceConfig,
  JobTemplatesMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobTemplatesInput,
  JobTemplates,
  JobTemplatesListResponse,
  JobTemplatesQueryInput,
  UpdateJobTemplatesInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobTemplates)
export class JobTemplatesResolver extends BaseResolver<
  CreateJobTemplatesInput,
  UpdateJobTemplatesInput,
  JobTemplatesQueryInput
>({
  viewDto: JobTemplates,
  createInput: CreateJobTemplatesInput,
  updateInput: UpdateJobTemplatesInput,
  listQueryInput: JobTemplatesQueryInput,
  listViewDto: JobTemplatesListResponse,
  name: 'jobTemplatesDetail',
  pluralName: 'jobTemplatesDetails',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobTemplatesMessagePattern);
  }
}
