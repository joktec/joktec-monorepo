import { JobMicroserviceConfig, JobBountyMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBountyInput,
  JobBountyListResponse,
  JobBounty,
  JobBountyQueryInput,
  UpdateJobBountyInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBounty)
export class JobBountyResolver extends BaseResolver<
  CreateJobBountyInput,
  UpdateJobBountyInput,
  JobBountyQueryInput
>({
  viewDto: JobBounty,
  createInput: CreateJobBountyInput,
  updateInput: UpdateJobBountyInput,
  listQueryInput: JobBountyQueryInput,
  listViewDto: JobBountyListResponse,
  name: 'jobBounty',
  pluralName: 'jobBounties',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBountyMessagePattern);
  }
}
