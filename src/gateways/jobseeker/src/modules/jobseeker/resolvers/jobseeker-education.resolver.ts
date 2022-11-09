import { firstValueFrom } from 'rxjs';
import {
  JobSeekerEducationMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerEducationInput,
  UpdateJobSeekerEducationInput,
  JobSeekerEducationQueryInput,
  JobSeekerEducationListReponse,
  JobSeekerEducation,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerEducation)
export class JobSeekerEducationResolver extends BaseResolver<
  CreateJobSeekerEducationInput,
  UpdateJobSeekerEducationInput,
  JobSeekerEducationQueryInput
>({
  viewDto: JobSeekerEducation,
  createInput: CreateJobSeekerEducationInput,
  updateInput: UpdateJobSeekerEducationInput,
  listQueryInput: JobSeekerEducationQueryInput,
  listViewDto: JobSeekerEducationListReponse,
  name: 'jobSeekerEducation',
  pluralName: 'jobSeekerEducations',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerEducationMessagePattern);
  }
}
