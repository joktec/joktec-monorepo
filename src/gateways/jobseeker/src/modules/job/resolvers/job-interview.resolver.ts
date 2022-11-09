import {
  JobMicroserviceConfig,
  JobInterviewMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobInterviewInput,
  JobInterview,
  JobInterviewListResponse,
  JobInterviewQueryInput,
  UpdateJobInterviewInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobInterview)
export class JobInterviewResolver extends BaseResolver<
  CreateJobInterviewInput,
  UpdateJobInterviewInput,
  JobInterviewQueryInput
>({
  viewDto: JobInterview,
  createInput: CreateJobInterviewInput,
  updateInput: UpdateJobInterviewInput,
  listQueryInput: JobInterviewQueryInput,
  listViewDto: JobInterviewListResponse,
  name: 'jobInterview',
  pluralName: 'jobInterviews',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobInterviewMessagePattern);
  }
}
