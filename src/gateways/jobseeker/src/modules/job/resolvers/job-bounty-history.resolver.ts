import {
  JobMicroserviceConfig,
  JobBountyHistoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBountyHistoryInput,
  JobBountyHistoryListResponse,
  JobBountyHistory,
  JobBountyHistoryQueryInput,
  UpdateJobBountyHistoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBountyHistory)
export class JobBountyHistoryResolver extends BaseResolver<
  CreateJobBountyHistoryInput,
  UpdateJobBountyHistoryInput,
  JobBountyHistoryQueryInput
>({
  viewDto: JobBountyHistory,
  createInput: CreateJobBountyHistoryInput,
  updateInput: UpdateJobBountyHistoryInput,
  listQueryInput: JobBountyHistoryQueryInput,
  listViewDto: JobBountyHistoryListResponse,
  name: 'jobBountyHistory',
  pluralName: 'jobBountyHistories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBountyHistoryMessagePattern);
  }
}
