import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobIndustryInput,
  JobIndustry,
  JobIndustryListResponse,
  JobIndustryQueryInput,
  UpdateJobIndustryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobIndustry)
export class JobIndustryResolver extends BaseResolver<
  CreateJobIndustryInput,
  UpdateJobIndustryInput,
  JobIndustryQueryInput
>({
  viewDto: JobIndustry,
  createInput: CreateJobIndustryInput,
  updateInput: UpdateJobIndustryInput,
  listQueryInput: JobIndustryQueryInput,
  listViewDto: JobIndustryListResponse,
  name: 'jobIndustry',
  pluralName: 'jobIndustries',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
