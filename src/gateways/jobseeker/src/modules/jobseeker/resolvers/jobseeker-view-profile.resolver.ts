import { firstValueFrom } from 'rxjs';
import {
  JobSeekerViewProfileMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerViewProfileInput,
  UpdateJobSeekerViewProfileInput,
  JobSeekerViewProfileQueryInput,
  JobSeekerViewProfileListReponse,
  JobSeekerViewProfile,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerViewProfile)
export class JobSeekerViewProfileResolver extends BaseResolver<
  CreateJobSeekerViewProfileInput,
  UpdateJobSeekerViewProfileInput,
  JobSeekerViewProfileQueryInput
>({
  viewDto: JobSeekerViewProfile,
  createInput: CreateJobSeekerViewProfileInput,
  updateInput: UpdateJobSeekerViewProfileInput,
  listQueryInput: JobSeekerViewProfileQueryInput,
  listViewDto: JobSeekerViewProfileListReponse,
  name: 'jobSeekerViewProfile',
  pluralName: 'jobSeekerViewProfiles',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerViewProfileMessagePattern);
  }
}
