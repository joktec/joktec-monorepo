import {
  JobMicroserviceConfig,
  JobhopSuggestedKeywordMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopSuggestedKeywordInput,
  JobhopSuggestedKeyword,
  JobhopSuggestedKeywordListResponse,
  JobhopSuggestedKeywordQueryInput,
  UpdateJobhopSuggestedKeywordInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopSuggestedKeyword)
export class JobhopSuggestedKeywordResolver extends BaseResolver<
  CreateJobhopSuggestedKeywordInput,
  UpdateJobhopSuggestedKeywordInput,
  JobhopSuggestedKeywordQueryInput
>({
  viewDto: JobhopSuggestedKeyword,
  createInput: CreateJobhopSuggestedKeywordInput,
  updateInput: UpdateJobhopSuggestedKeywordInput,
  listQueryInput: JobhopSuggestedKeywordQueryInput,
  listViewDto: JobhopSuggestedKeywordListResponse,
  name: 'jobhopSuggestedKeyword',
  pluralName: 'jobhopSuggestedKeywords',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopSuggestedKeywordMessagePattern);
  }
}
