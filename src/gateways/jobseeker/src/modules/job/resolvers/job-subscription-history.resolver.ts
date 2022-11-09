import {
  JobMicroserviceConfig,
  JobSubscriptionHistoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobSubscriptionHistoryInput,
  JobSubscriptionHistory,
  JobSubscriptionHistoryListResponse,
  JobSubscriptionHistoryQueryInput,
  UpdateJobSubscriptionHistoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobSubscriptionHistory)
export class JobSubscriptionHistoryResolver extends BaseResolver<
  CreateJobSubscriptionHistoryInput,
  UpdateJobSubscriptionHistoryInput,
  JobSubscriptionHistoryQueryInput
>({
  viewDto: JobSubscriptionHistory,
  createInput: CreateJobSubscriptionHistoryInput,
  updateInput: UpdateJobSubscriptionHistoryInput,
  listQueryInput: JobSubscriptionHistoryQueryInput,
  listViewDto: JobSubscriptionHistoryListResponse,
  name: 'jobSubscriptionHistory',
  pluralName: 'jobSubscriptionHistories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobSubscriptionHistoryMessagePattern);
  }
}
