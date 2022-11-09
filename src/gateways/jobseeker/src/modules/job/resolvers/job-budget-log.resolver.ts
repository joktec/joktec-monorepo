import {
  JobMicroserviceConfig,
  JobBudgetLogMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBudgetLogInput,
  JobBudgetLogListResponse,
  JobBudgetLog,
  JobBudgetLogQueryInput,
  UpdateJobBudgetLogInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBudgetLog)
export class JobBudgetLogResolver extends BaseResolver<
  CreateJobBudgetLogInput,
  UpdateJobBudgetLogInput,
  JobBudgetLogQueryInput
>({
  viewDto: JobBudgetLog,
  createInput: CreateJobBudgetLogInput,
  updateInput: UpdateJobBudgetLogInput,
  listQueryInput: JobBudgetLogQueryInput,
  listViewDto: JobBudgetLogListResponse,
  name: 'jobBudgetLog',
  pluralName: 'jobBudgetLogs',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBudgetLogMessagePattern);
  }
}
