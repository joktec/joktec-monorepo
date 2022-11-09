import { firstValueFrom } from 'rxjs';
import {
  JobSeekerInterestMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerInterestInput,
  UpdateJobSeekerInterestInput,
  JobSeekerInterestQueryInput,
  JobSeekerInterestListReponse,
  JobSeekerInterest,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerInterest)
export class JobSeekerInterestResolver extends BaseResolver<
  CreateJobSeekerInterestInput,
  UpdateJobSeekerInterestInput,
  JobSeekerInterestQueryInput
>({
  viewDto: JobSeekerInterest,
  createInput: CreateJobSeekerInterestInput,
  updateInput: UpdateJobSeekerInterestInput,
  listQueryInput: JobSeekerInterestQueryInput,
  listViewDto: JobSeekerInterestListReponse,
  name: 'jobSeekerInterest',
  pluralName: 'jobSeekerInterests',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerInterestMessagePattern);
  }
}
