import {
  JobMicroserviceConfig,
  JobBoardApplyLogMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobBoardApplyLogInput,
  JobBoardApplyLogListResponse,
  JobBoardApplyLog,
  JobBoardApplyLogQueryInput,
  UpdateJobBoardApplyLogInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobBoardApplyLog)
export class JobBoardApplyLogResolver extends BaseResolver<
  CreateJobBoardApplyLogInput,
  UpdateJobBoardApplyLogInput,
  JobBoardApplyLogQueryInput
>({
  viewDto: JobBoardApplyLog,
  createInput: CreateJobBoardApplyLogInput,
  updateInput: UpdateJobBoardApplyLogInput,
  listQueryInput: JobBoardApplyLogQueryInput,
  listViewDto: JobBoardApplyLogListResponse,
  name: 'jobBoardApplyLog',
  pluralName: 'jobBoardApplyLoges',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobBoardApplyLogMessagePattern);
  }
}
