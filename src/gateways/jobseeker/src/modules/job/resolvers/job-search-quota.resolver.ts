import {
  JobMicroserviceConfig,
  JobSearchQuotaMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobSearchQuotaInput,
  JobSearchQuota,
  JobSearchQuotaListResponse,
  JobSearchQuotaQueryInput,
  UpdateJobSearchQuotaInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobSearchQuota)
export class JobSearchQuotaResolver extends BaseResolver<
  CreateJobSearchQuotaInput,
  UpdateJobSearchQuotaInput,
  JobSearchQuotaQueryInput
>({
  viewDto: JobSearchQuota,
  createInput: CreateJobSearchQuotaInput,
  updateInput: UpdateJobSearchQuotaInput,
  listQueryInput: JobSearchQuotaQueryInput,
  listViewDto: JobSearchQuotaListResponse,
  name: 'jobSearchQuota',
  pluralName: 'jobSearchQuotas',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobSearchQuotaMessagePattern);
  }
}
