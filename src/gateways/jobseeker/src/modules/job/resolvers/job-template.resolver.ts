import {
  JobMicroserviceConfig,
  JobTemplateMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobTemplateInput,
  JobTemplate,
  JobTemplateListResponse,
  JobTemplateQueryInput,
  UpdateJobTemplateInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobTemplate)
export class JobTemplateResolver extends BaseResolver<
  CreateJobTemplateInput,
  UpdateJobTemplateInput,
  JobTemplateQueryInput
>({
  viewDto: JobTemplate,
  createInput: CreateJobTemplateInput,
  updateInput: UpdateJobTemplateInput,
  listQueryInput: JobTemplateQueryInput,
  listViewDto: JobTemplateListResponse,
  name: 'jobTemplate',
  pluralName: 'jobTemplates',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobTemplateMessagePattern);
  }
}
