import {
  JobMicroserviceConfig,
  JobInterviewHistoryMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobInterviewHistoryInput,
  JobInterviewHistory,
  JobInterviewHistoryListResponse,
  JobInterviewHistoryQueryInput,
  UpdateJobInterviewHistoryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobInterviewHistory)
export class JobInterviewHistoryResolver extends BaseResolver<
  CreateJobInterviewHistoryInput,
  UpdateJobInterviewHistoryInput,
  JobInterviewHistoryQueryInput
>({
  viewDto: JobInterviewHistory,
  createInput: CreateJobInterviewHistoryInput,
  updateInput: UpdateJobInterviewHistoryInput,
  listQueryInput: JobInterviewHistoryQueryInput,
  listViewDto: JobInterviewHistoryListResponse,
  name: 'jobInterviewHistory',
  pluralName: 'jobInterviewHistories',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobInterviewHistoryMessagePattern);
  }
}
