import {
  JobMicroserviceConfig,
  JobhopJobCategoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopJobCategory,
  JobhopJobCategoryListResponse,
  JobhopJobCategoryQueryInput,
  UpdateJobhopJobCategoryInput,
  CreateJobhopJobCategoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopJobCategory)
export class JobhopJobCategoryResolver extends BaseResolver<
  CreateJobhopJobCategoryInput,
  UpdateJobhopJobCategoryInput,
  JobhopJobCategoryQueryInput
>({
  viewDto: JobhopJobCategory,
  createInput: CreateJobhopJobCategoryInput,
  updateInput: UpdateJobhopJobCategoryInput,
  listQueryInput: JobhopJobCategoryQueryInput,
  listViewDto: JobhopJobCategoryListResponse,
  name: 'jobhopJobCategory',
  pluralName: 'jobhopJobCategories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopJobCategoryMessagePattern);
  }
}
