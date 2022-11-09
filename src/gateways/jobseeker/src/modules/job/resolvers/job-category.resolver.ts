import {
  JobMicroserviceConfig,
  JobCategoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobCategoryInput,
  JobCategory,
  JobCategoryListResponse,
  JobCategoryQueryInput,
  UpdateJobCategoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobCategory)
export class JobCategoryResolver extends BaseResolver<
  CreateJobCategoryInput,
  UpdateJobCategoryInput,
  JobCategoryQueryInput
>({
  viewDto: JobCategory,
  createInput: CreateJobCategoryInput,
  updateInput: UpdateJobCategoryInput,
  listQueryInput: JobCategoryQueryInput,
  listViewDto: JobCategoryListResponse,
  name: 'jobCategory',
  pluralName: 'jobCategories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobCategoryMessagePattern);
  }
}
