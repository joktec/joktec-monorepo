import { JobMicroserviceConfig, JobStatsMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobStatsInput,
  JobStats,
  JobStatsListResponse,
  JobStatsQueryInput,
  UpdateJobStatsInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobStats)
export class JobStatsResolver extends BaseResolver<
  CreateJobStatsInput,
  UpdateJobStatsInput,
  JobStatsQueryInput
>({
  viewDto: JobStats,
  createInput: CreateJobStatsInput,
  updateInput: UpdateJobStatsInput,
  listQueryInput: JobStatsQueryInput,
  listViewDto: JobStatsListResponse,
  name: 'jobStats',
  pluralName: 'jobStatses',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobStatsMessagePattern);
  }
}
