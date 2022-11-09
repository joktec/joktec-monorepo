import { JobMicroserviceConfig, JobMatchMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobMatchInput,
  JobMatch,
  JobMatchListResponse,
  JobMatchQueryInput,
  UpdateJobMatchInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobMatch)
export class JobMatchResolver extends BaseResolver<
  CreateJobMatchInput,
  UpdateJobMatchInput,
  JobMatchQueryInput
>({
  viewDto: JobMatch,
  createInput: CreateJobMatchInput,
  updateInput: UpdateJobMatchInput,
  listQueryInput: JobMatchQueryInput,
  listViewDto: JobMatchListResponse,
  name: 'jobMatch',
  pluralName: 'jobMatchs',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMatchMessagePattern);
  }
}
