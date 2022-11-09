import {
  JobMicroserviceConfig,
  JobBudgetSuggestInfoMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBudgetSuggestInfoInput,
  JobBudgetSuggestInfoListResponse,
  JobBudgetSuggestInfo,
  JobBudgetSuggestInfoQueryInput,
  UpdateJobBudgetSuggestInfoInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBudgetSuggestInfo)
export class JobBudgetSuggestInfoResolver extends BaseResolver<
  CreateJobBudgetSuggestInfoInput,
  UpdateJobBudgetSuggestInfoInput,
  JobBudgetSuggestInfoQueryInput
>({
  viewDto: JobBudgetSuggestInfo,
  createInput: CreateJobBudgetSuggestInfoInput,
  updateInput: UpdateJobBudgetSuggestInfoInput,
  listQueryInput: JobBudgetSuggestInfoQueryInput,
  listViewDto: JobBudgetSuggestInfoListResponse,
  name: 'jobBudgetSuggestInfo',
  pluralName: 'jobBudgetSuggestInfos',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBudgetSuggestInfoMessagePattern);
  }
}
