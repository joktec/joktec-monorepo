import {
  JobMicroserviceConfig,
  JobViewRawMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobViewRaw,
  JobViewRawListResponse,
  JobViewRawQueryInput,
  UpdateJobViewRawInput,
  CreateJobViewRawInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobViewRaw)
export class JobViewRawResolver extends BaseResolver<
  CreateJobViewRawInput,
  UpdateJobViewRawInput,
  JobViewRawQueryInput
>({
  viewDto: JobViewRaw,
  createInput: CreateJobViewRawInput,
  updateInput: UpdateJobViewRawInput,
  listQueryInput: JobViewRawQueryInput,
  listViewDto: JobViewRawListResponse,
  name: 'jobViewRaw',
  pluralName: 'jobViewRaws',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobViewRawMessagePattern);
  }
}
