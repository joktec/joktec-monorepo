import {
  JobMicroserviceConfig,
  JobBudgetRequestMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBudgetRequestInput,
  JobBudgetRequestListResponse,
  JobBudgetRequest,
  JobBudgetRequestQueryInput,
  UpdateJobBudgetRequestInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBudgetRequest)
export class JobBudgetRequestResolver extends BaseResolver<
  CreateJobBudgetRequestInput,
  UpdateJobBudgetRequestInput,
  JobBudgetRequestQueryInput
>({
  viewDto: JobBudgetRequest,
  createInput: CreateJobBudgetRequestInput,
  updateInput: UpdateJobBudgetRequestInput,
  listQueryInput: JobBudgetRequestQueryInput,
  listViewDto: JobBudgetRequestListResponse,
  name: 'jobBudgetRequest',
  pluralName: 'jobBudgetRequests',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBudgetRequestMessagePattern);
  }
}
