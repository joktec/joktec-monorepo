import {
  JobMicroserviceConfig,
  JobInterviewCategoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobInterviewCategoryInput,
  JobInterviewCategory,
  JobInterviewCategoryListResponse,
  JobInterviewCategoryQueryInput,
  UpdateJobInterviewCategoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobInterviewCategory)
export class JobInterviewCategoryResolver extends BaseResolver<
  CreateJobInterviewCategoryInput,
  UpdateJobInterviewCategoryInput,
  JobInterviewCategoryQueryInput
>({
  viewDto: JobInterviewCategory,
  createInput: CreateJobInterviewCategoryInput,
  updateInput: UpdateJobInterviewCategoryInput,
  listQueryInput: JobInterviewCategoryQueryInput,
  listViewDto: JobInterviewCategoryListResponse,
  name: 'jobInterviewCategory',
  pluralName: 'jobInterviewCategories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobInterviewCategoryMessagePattern);
  }
}
