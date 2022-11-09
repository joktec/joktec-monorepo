import { firstValueFrom } from 'rxjs';
import {
  JobSeekerJobExpectedMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerJobExpectedInput,
  UpdateJobSeekerJobExpectedInput,
  JobSeekerJobExpectedQueryInput,
  JobSeekerJobExpectedListReponse,
  JobSeekerJobExpected,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerJobExpected)
export class JobSeekerJobExpectedResolver extends BaseResolver<
  CreateJobSeekerJobExpectedInput,
  UpdateJobSeekerJobExpectedInput,
  JobSeekerJobExpectedQueryInput
>({
  viewDto: JobSeekerJobExpected,
  createInput: CreateJobSeekerJobExpectedInput,
  updateInput: UpdateJobSeekerJobExpectedInput,
  listQueryInput: JobSeekerJobExpectedQueryInput,
  listViewDto: JobSeekerJobExpectedListReponse,
  name: 'jobSeekerJobExpected',
  pluralName: 'jobSeekerJobExpecteds',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerJobExpectedMessagePattern);
  }
}
