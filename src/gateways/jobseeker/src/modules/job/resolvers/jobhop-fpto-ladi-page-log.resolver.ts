import {
  JobMicroserviceConfig,
  JobhopFptoLadipageLogMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopFptoLadiPageLog,
  JobhopFptoLadiPageLogListResponse,
  JobhopFptoLadiPageLogQueryInput,
  UpdateJobhopFptoLadiPageLogInput,
  CreateJobhopFptoLadiPageLogInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopFptoLadiPageLog)
export class JobhopFptoLadiPageLogResolver extends BaseResolver<
  CreateJobhopFptoLadiPageLogInput,
  UpdateJobhopFptoLadiPageLogInput,
  JobhopFptoLadiPageLogQueryInput
>({
  viewDto: JobhopFptoLadiPageLog,
  createInput: CreateJobhopFptoLadiPageLogInput,
  updateInput: UpdateJobhopFptoLadiPageLogInput,
  listQueryInput: JobhopFptoLadiPageLogQueryInput,
  listViewDto: JobhopFptoLadiPageLogListResponse,
  name: 'jobhopFptoLadiPageLog',
  pluralName: 'jobhopFptoLadiPageLogs',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopFptoLadipageLogMessagePattern);
  }
}
