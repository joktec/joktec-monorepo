import { firstValueFrom } from 'rxjs';
import {
  JobSeekerAwardMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerAwardInput,
  UpdateJobSeekerAwardInput,
  JobSeekerAwardQueryInput,
  JobSeekerAwardListReponse,
  JobSeekerAward,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerAward)
export class JobSeekerAwardResolver extends BaseResolver<
  CreateJobSeekerAwardInput,
  UpdateJobSeekerAwardInput,
  JobSeekerAwardQueryInput
>({
  viewDto: JobSeekerAward,
  createInput: CreateJobSeekerAwardInput,
  updateInput: UpdateJobSeekerAwardInput,
  listQueryInput: JobSeekerAwardQueryInput,
  listViewDto: JobSeekerAwardListReponse,
  name: 'jobSeekerAward',
  pluralName: 'jobSeekerAwards',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerAwardMessagePattern);
  }
}
