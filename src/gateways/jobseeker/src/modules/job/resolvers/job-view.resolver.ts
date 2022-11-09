import { JobMicroserviceConfig, JobViewMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  JobView,
  JobViewListResponse,
  JobViewQueryInput,
  UpdateJobViewInput,
  CreateJobViewInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobView)
export class JobViewResolver extends BaseResolver<
  CreateJobViewInput,
  UpdateJobViewInput,
  JobViewQueryInput
>({
  viewDto: JobView,
  createInput: CreateJobViewInput,
  updateInput: UpdateJobViewInput,
  listQueryInput: JobViewQueryInput,
  listViewDto: JobViewListResponse,
  name: 'jobView',
  pluralName: 'jobViews',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobViewMessagePattern);
  }
}
