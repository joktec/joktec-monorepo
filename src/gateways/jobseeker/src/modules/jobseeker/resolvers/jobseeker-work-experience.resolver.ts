import { firstValueFrom } from 'rxjs';
import {
  JobSeekerWorkExperienceMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerWorkExperienceInput,
  UpdateJobSeekerWorkExperienceInput,
  JobSeekerWorkExperienceQueryInput,
  JobSeekerWorkExperienceListReponse,
  JobSeekerWorkExperience,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerWorkExperience)
export class JobSeekerWorkExperienceResolver extends BaseResolver<
  CreateJobSeekerWorkExperienceInput,
  UpdateJobSeekerWorkExperienceInput,
  JobSeekerWorkExperienceQueryInput
>({
  viewDto: JobSeekerWorkExperience,
  createInput: CreateJobSeekerWorkExperienceInput,
  updateInput: UpdateJobSeekerWorkExperienceInput,
  listQueryInput: JobSeekerWorkExperienceQueryInput,
  listViewDto: JobSeekerWorkExperienceListReponse,
  name: 'jobSeekerWorkExperience',
  pluralName: 'jobSeekerWorkExperiences',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerWorkExperienceMessagePattern);
  }
}
