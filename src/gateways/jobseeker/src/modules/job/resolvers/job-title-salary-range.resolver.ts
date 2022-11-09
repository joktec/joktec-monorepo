import {
  JobMicroserviceConfig,
  JobTitleSalaryRangeMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobTitleSalaryRange,
  JobTitleSalaryRangeListResponse,
  JobTitleSalaryRangeQueryInput,
  UpdateJobTitleSalaryRangeInput,
  CreateJobTitleSalaryRangeInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobTitleSalaryRange)
export class JobTitleSalaryRangeResolver extends BaseResolver<
  CreateJobTitleSalaryRangeInput,
  UpdateJobTitleSalaryRangeInput,
  JobTitleSalaryRangeQueryInput
>({
  viewDto: JobTitleSalaryRange,
  createInput: CreateJobTitleSalaryRangeInput,
  updateInput: UpdateJobTitleSalaryRangeInput,
  listQueryInput: JobTitleSalaryRangeQueryInput,
  listViewDto: JobTitleSalaryRangeListResponse,
  name: 'jobTitleSalaryRange',
  pluralName: 'jobTitleSalaryRanges',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobTitleSalaryRangeMessagePattern);
  }
}
