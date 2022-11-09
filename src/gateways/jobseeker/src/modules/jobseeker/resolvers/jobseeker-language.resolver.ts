import { firstValueFrom } from 'rxjs';
import {
  JobSeekerLanguageMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerLanguageInput,
  UpdateJobSeekerLanguageInput,
  JobSeekerLanguageQueryInput,
  JobSeekerLanguageListReponse,
  JobSeekerLanguage,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerLanguage)
export class JobSeekerLanguageResolver extends BaseResolver<
  CreateJobSeekerLanguageInput,
  UpdateJobSeekerLanguageInput,
  JobSeekerLanguageQueryInput
>({
  viewDto: JobSeekerLanguage,
  createInput: CreateJobSeekerLanguageInput,
  updateInput: UpdateJobSeekerLanguageInput,
  listQueryInput: JobSeekerLanguageQueryInput,
  listViewDto: JobSeekerLanguageListReponse,
  name: 'jobSeekerLanguage',
  pluralName: 'jobSeekerLanguages',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerLanguageMessagePattern);
  }
}
