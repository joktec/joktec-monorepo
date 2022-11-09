import {
  JobMicroserviceConfig,
  JobBudgetRequestAddedMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBudgetRequestAddedInput,
  JobBudgetRequestAddedListResponse,
  JobBudgetRequestAdded,
  JobBudgetRequestAddedQueryInput,
  UpdateJobBudgetRequestAddedInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBudgetRequestAdded)
export class JobBudgetRequestAddedResolver extends BaseResolver<
  CreateJobBudgetRequestAddedInput,
  UpdateJobBudgetRequestAddedInput,
  JobBudgetRequestAddedQueryInput
>({
  viewDto: JobBudgetRequestAdded,
  createInput: CreateJobBudgetRequestAddedInput,
  updateInput: UpdateJobBudgetRequestAddedInput,
  listQueryInput: JobBudgetRequestAddedQueryInput,
  listViewDto: JobBudgetRequestAddedListResponse,
  name: 'jobBudgetRequestAdded',
  pluralName: 'jobBudgetRequestAddeds',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBudgetRequestAddedMessagePattern);
  }
}
