import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobLocationInput,
  JobLocation,
  JobLocationListResponse,
  JobLocationQueryInput,
  UpdateJobLocationInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobLocation)
export class JobLocationResolver extends BaseResolver<
  CreateJobLocationInput,
  UpdateJobLocationInput,
  JobLocationQueryInput
>({
  viewDto: JobLocation,
  createInput: CreateJobLocationInput,
  updateInput: UpdateJobLocationInput,
  listQueryInput: JobLocationQueryInput,
  listViewDto: JobLocationListResponse,
  name: 'jobLocation',
  pluralName: 'jobLocations',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
