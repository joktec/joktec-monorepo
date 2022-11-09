import {
  JobMicroserviceConfig,
  JobhopEmailHistoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopEmailHistory,
  JobhopEmailHistoryListResponse,
  JobhopEmailHistoryQueryInput,
  UpdateJobhopEmailHistoryInput,
  CreateJobhopEmailHistoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopEmailHistory)
export class JobhopEmailHistoryResolver extends BaseResolver<
  CreateJobhopEmailHistoryInput,
  UpdateJobhopEmailHistoryInput,
  JobhopEmailHistoryQueryInput
>({
  viewDto: JobhopEmailHistory,
  createInput: CreateJobhopEmailHistoryInput,
  updateInput: UpdateJobhopEmailHistoryInput,
  listQueryInput: JobhopEmailHistoryQueryInput,
  listViewDto: JobhopEmailHistoryListResponse,
  name: 'jobhopEmailHistory',
  pluralName: 'jobhopEmailHistories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopEmailHistoryMessagePattern);
  }
}
