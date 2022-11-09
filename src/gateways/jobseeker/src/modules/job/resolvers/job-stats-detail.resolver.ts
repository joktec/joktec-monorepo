import {
  JobMicroserviceConfig,
  JobStatsDetailMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobStatsDetailInput,
  JobStatsDetail,
  JobStatsDetailListResponse,
  JobStatsDetailQueryInput,
  UpdateJobStatsDetailInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobStatsDetail)
export class JobStatsDetailResolver extends BaseResolver<
  CreateJobStatsDetailInput,
  UpdateJobStatsDetailInput,
  JobStatsDetailQueryInput
>({
  viewDto: JobStatsDetail,
  createInput: CreateJobStatsDetailInput,
  updateInput: UpdateJobStatsDetailInput,
  listQueryInput: JobStatsDetailQueryInput,
  listViewDto: JobStatsDetailListResponse,
  name: 'jobStatsDetail',
  pluralName: 'jobStatsDetails',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobStatsDetailMessagePattern);
  }
}
