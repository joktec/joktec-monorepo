import {
  JobMicroserviceConfig,
  JobGroupBurntCreditsMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobGroupBurntCredits,
  JobGroupBurntCreditsListResponse,
  JobGroupBurntCreditsQueryInput,
  UpdateJobGroupBurntCreditsInput,
  CreateJobGroupBurntCreditsInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobGroupBurntCredits)
export class JobGroupBurntCreditsResolver extends BaseResolver<
  CreateJobGroupBurntCreditsInput,
  UpdateJobGroupBurntCreditsInput,
  JobGroupBurntCreditsQueryInput
>({
  viewDto: JobGroupBurntCredits,
  createInput: CreateJobGroupBurntCreditsInput,
  updateInput: UpdateJobGroupBurntCreditsInput,
  listQueryInput: JobGroupBurntCreditsQueryInput,
  listViewDto: JobGroupBurntCreditsListResponse,
  name: 'jobGroupBurntCredits',
  pluralName: 'jobGroupBurntCreditss',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobGroupBurntCreditsMessagePattern);
  }
}
