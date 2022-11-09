import { firstValueFrom } from 'rxjs';
import {
  JobSeekerJobSavedMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerJobSavedInput,
  UpdateJobSeekerJobSavedInput,
  JobSeekerJobSavedQueryInput,
  JobSeekerJobSavedListReponse,
  JobSeekerJobSaved,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerJobSaved)
export class JobSeekerJobSavedResolver extends BaseResolver<
  CreateJobSeekerJobSavedInput,
  UpdateJobSeekerJobSavedInput,
  JobSeekerJobSavedQueryInput
>({
  viewDto: JobSeekerJobSaved,
  createInput: CreateJobSeekerJobSavedInput,
  updateInput: UpdateJobSeekerJobSavedInput,
  listQueryInput: JobSeekerJobSavedQueryInput,
  listViewDto: JobSeekerJobSavedListReponse,
  name: 'jobSeekerJobSaved',
  pluralName: 'jobSeekerJobSaveds',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerJobSavedMessagePattern);
  }
}
