import {
  JobMicroserviceConfig,
  JobBudgetHistoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBudgetHistoryInput,
  JobBudgetHistoryListResponse,
  JobBudgetHistory,
  JobBudgetHistoryQueryInput,
  UpdateJobBudgetHistoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBudgetHistory)
export class JobBudgetHistoryResolver extends BaseResolver<
  CreateJobBudgetHistoryInput,
  UpdateJobBudgetHistoryInput,
  JobBudgetHistoryQueryInput
>({
  viewDto: JobBudgetHistory,
  createInput: CreateJobBudgetHistoryInput,
  updateInput: UpdateJobBudgetHistoryInput,
  listQueryInput: JobBudgetHistoryQueryInput,
  listViewDto: JobBudgetHistoryListResponse,
  name: 'jobBudgetHistory',
  pluralName: 'jobBudgetHistories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBudgetHistoryMessagePattern);
  }
}
