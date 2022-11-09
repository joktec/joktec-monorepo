import {
  JobMicroserviceConfig,
  JobInterviewCsInChargeMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobInterviewCsInChargeInput,
  JobInterviewCsInCharge,
  JobInterviewCsInChargeListResponse,
  JobInterviewCsInChargeQueryInput,
  UpdateJobInterviewCsInChargeInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobInterviewCsInCharge)
export class JobInterviewCsInChargeResolver extends BaseResolver<
  CreateJobInterviewCsInChargeInput,
  UpdateJobInterviewCsInChargeInput,
  JobInterviewCsInChargeQueryInput
>({
  viewDto: JobInterviewCsInCharge,
  createInput: CreateJobInterviewCsInChargeInput,
  updateInput: UpdateJobInterviewCsInChargeInput,
  listQueryInput: JobInterviewCsInChargeQueryInput,
  listViewDto: JobInterviewCsInChargeListResponse,
  name: 'jobInterviewCsInCharge',
  pluralName: 'jobInterviewCsInCharges',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobInterviewCsInChargeMessagePattern);
  }
}
