import {
  JobMicroserviceConfig,
  JobThumdownReasonMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobThumdownReason,
  JobThumdownReasonListResponse,
  JobThumdownReasonQueryInput,
  UpdateJobThumdownReasonInput,
  CreateJobThumdownReasonInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobThumdownReason)
export class JobThumdownReasonResolver extends BaseResolver<
  CreateJobThumdownReasonInput,
  UpdateJobThumdownReasonInput,
  JobThumdownReasonQueryInput
>({
  viewDto: JobThumdownReason,
  createInput: CreateJobThumdownReasonInput,
  updateInput: UpdateJobThumdownReasonInput,
  listQueryInput: JobThumdownReasonQueryInput,
  listViewDto: JobThumdownReasonListResponse,
  name: 'jobThumdownReason',
  pluralName: 'jobThumdownReasons',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobThumdownReasonMessagePattern);
  }
}
