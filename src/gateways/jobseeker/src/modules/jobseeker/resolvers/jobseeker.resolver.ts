import { firstValueFrom } from 'rxjs';
import {
  JobSeekerMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerInput,
  UpdateJobSeekerInput,
  JobSeekerQueryInput,
  JobSeekerListReponse,
  JobSeeker,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeeker)
export class JobSeekerResolver extends BaseResolver<
  CreateJobSeekerInput,
  UpdateJobSeekerInput,
  JobSeekerQueryInput
>({
  viewDto: JobSeeker,
  createInput: CreateJobSeekerInput,
  updateInput: UpdateJobSeekerInput,
  listQueryInput: JobSeekerQueryInput,
  listViewDto: JobSeekerListReponse,
  name: 'jobseeker',
  pluralName: 'jobseekers',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerMessagePattern);
  }
}
