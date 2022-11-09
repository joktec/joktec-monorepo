import {
  JobMicroserviceConfig,
  JobVersionMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobVersionInput,
  JobVersion,
  JobVersionListResponse,
  JobVersionQueryInput,
  UpdateJobVersionInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobVersion)
export class JobVersionResolver extends BaseResolver<
  CreateJobVersionInput,
  UpdateJobVersionInput,
  JobVersionQueryInput
>({
  viewDto: JobVersion,
  createInput: CreateJobVersionInput,
  updateInput: UpdateJobVersionInput,
  listQueryInput: JobVersionQueryInput,
  listViewDto: JobVersionListResponse,
  name: 'jobVersion',
  pluralName: 'jobVersions',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobVersionMessagePattern);
  }
}
