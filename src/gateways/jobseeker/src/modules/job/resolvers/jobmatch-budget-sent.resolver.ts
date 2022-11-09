import {
  JobMicroserviceConfig,
  JobMatchBudgetSentMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobMatchBudgetSentInput,
  JobMatchBudgetSent,
  JobMatchBudgetSentListResponse,
  JobMatchBudgetSentQueryInput,
  UpdateJobMatchBudgetSentInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobMatchBudgetSent)
export class JobMatchBudgetSentResolver extends BaseResolver<
  CreateJobMatchBudgetSentInput,
  UpdateJobMatchBudgetSentInput,
  JobMatchBudgetSentQueryInput
>({
  viewDto: JobMatchBudgetSent,
  createInput: CreateJobMatchBudgetSentInput,
  updateInput: UpdateJobMatchBudgetSentInput,
  listQueryInput: JobMatchBudgetSentQueryInput,
  listViewDto: JobMatchBudgetSentListResponse,
  name: 'jobMatchBudgetSent',
  pluralName: 'jobMatchBudgetSents',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMatchBudgetSentMessagePattern);
  }
}
