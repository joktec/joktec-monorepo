import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobLanguageInput,
  JobLanguage,
  JobLanguageListResponse,
  JobLanguageQueryInput,
  UpdateJobLanguageInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobLanguage)
export class JobLanguageResolver extends BaseResolver<
  CreateJobLanguageInput,
  UpdateJobLanguageInput,
  JobLanguageQueryInput
>({
  viewDto: JobLanguage,
  createInput: CreateJobLanguageInput,
  updateInput: UpdateJobLanguageInput,
  listQueryInput: JobLanguageQueryInput,
  listViewDto: JobLanguageListResponse,
  name: 'jobLanguage',
  pluralName: 'jobLanguages',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
