import { JobMicroserviceConfig, JobBudgetMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBudgetInput,
  JobBudgetListResponse,
  JobBudget,
  JobBudgetQueryInput,
  UpdateJobBudgetInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBudget)
export class JobBudgetResolver extends BaseResolver<
  CreateJobBudgetInput,
  UpdateJobBudgetInput,
  JobBudgetQueryInput
>({
  viewDto: JobBudget,
  createInput: CreateJobBudgetInput,
  updateInput: UpdateJobBudgetInput,
  listQueryInput: JobBudgetQueryInput,
  listViewDto: JobBudgetListResponse,
  name: 'jobBudget',
  pluralName: 'jobBudgets',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBudgetMessagePattern);
  }
}
