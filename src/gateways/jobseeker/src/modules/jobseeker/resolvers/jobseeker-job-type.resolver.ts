import { firstValueFrom } from 'rxjs';
import {
  JobSeekerJobTypeMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerJobTypeInput,
  UpdateJobSeekerJobTypeInput,
  JobSeekerJobTypeQueryInput,
  JobSeekerJobTypeListReponse,
  JobSeekerJobType,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerJobType)
export class JobSeekerJobTypeResolver extends BaseResolver<
  CreateJobSeekerJobTypeInput,
  UpdateJobSeekerJobTypeInput,
  JobSeekerJobTypeQueryInput
>({
  viewDto: JobSeekerJobType,
  createInput: CreateJobSeekerJobTypeInput,
  updateInput: UpdateJobSeekerJobTypeInput,
  listQueryInput: JobSeekerJobTypeQueryInput,
  listViewDto: JobSeekerJobTypeListReponse,
  name: 'jobSeekerJobType',
  pluralName: 'jobSeekerJobTypes',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerJobTypeMessagePattern);
  }
}
