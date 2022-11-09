import { firstValueFrom } from 'rxjs';
import {
  JobSeekerCareerInterestCardMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerCareerInterestCardInput,
  UpdateJobSeekerCareerInterestCardInput,
  JobSeekerCareerInterestCardQueryInput,
  JobSeekerCareerInterestCardListReponse,
  JobSeekerCareerInterestCard,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerCareerInterestCard)
export class JobSeekerCareerInterestCardResolver extends BaseResolver<
  CreateJobSeekerCareerInterestCardInput,
  UpdateJobSeekerCareerInterestCardInput,
  JobSeekerCareerInterestCardQueryInput
>({
  viewDto: JobSeekerCareerInterestCard,
  createInput: CreateJobSeekerCareerInterestCardInput,
  updateInput: UpdateJobSeekerCareerInterestCardInput,
  listQueryInput: JobSeekerCareerInterestCardQueryInput,
  listViewDto: JobSeekerCareerInterestCardListReponse,
  name: 'jobSeekerCareerInterestCard',
  pluralName: 'jobSeekerCareerInterestCards',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerCareerInterestCardMessagePattern);
  }
}
