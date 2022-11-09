import {
  JobMicroserviceConfig,
  JobSalaryTemplateMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobSalaryTemplateInput,
  JobSalaryTemplate,
  JobSalaryTemplateListResponse,
  JobSalaryTemplateQueryInput,
  UpdateJobSalaryTemplateInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobSalaryTemplate)
export class JobSalaryTemplateResolver extends BaseResolver<
  CreateJobSalaryTemplateInput,
  UpdateJobSalaryTemplateInput,
  JobSalaryTemplateQueryInput
>({
  viewDto: JobSalaryTemplate,
  createInput: CreateJobSalaryTemplateInput,
  updateInput: UpdateJobSalaryTemplateInput,
  listQueryInput: JobSalaryTemplateQueryInput,
  listViewDto: JobSalaryTemplateListResponse,
  name: 'jobSalaryTemplate',
  pluralName: 'jobSalaryTemplates',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobSalaryTemplateMessagePattern);
  }
}
