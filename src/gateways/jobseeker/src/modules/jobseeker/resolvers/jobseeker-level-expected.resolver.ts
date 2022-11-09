import { firstValueFrom } from 'rxjs';
import {
  JobSeekerLevelExpectedMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerLevelExpectedInput,
  UpdateJobSeekerLevelExpectedInput,
  JobSeekerLevelExpectedQueryInput,
  JobSeekerLevelExpectedListReponse,
  JobSeekerLevelExpected,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerLevelExpected)
export class JobSeekerLevelExpectedResolver extends BaseResolver<
  CreateJobSeekerLevelExpectedInput,
  UpdateJobSeekerLevelExpectedInput,
  JobSeekerLevelExpectedQueryInput
>({
  viewDto: JobSeekerLevelExpected,
  createInput: CreateJobSeekerLevelExpectedInput,
  updateInput: UpdateJobSeekerLevelExpectedInput,
  listQueryInput: JobSeekerLevelExpectedQueryInput,
  listViewDto: JobSeekerLevelExpectedListReponse,
  name: 'jobSeekerLevelExpected',
  pluralName: 'jobSeekerLevelExpecteds',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerLevelExpectedMessagePattern);
  }
}
