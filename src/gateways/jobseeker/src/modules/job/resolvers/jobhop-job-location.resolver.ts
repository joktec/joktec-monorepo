import {
  JobMicroserviceConfig,
  JobhopJobLocationMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopJobLocation,
  JobhopJobLocationListResponse,
  JobhopJobLocationQueryInput,
  UpdateJobhopJobLocationInput,
  CreateJobhopJobLocationInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopJobLocation)
export class JobhopJobLocationResolver extends BaseResolver<
  CreateJobhopJobLocationInput,
  UpdateJobhopJobLocationInput,
  JobhopJobLocationQueryInput
>({
  viewDto: JobhopJobLocation,
  createInput: CreateJobhopJobLocationInput,
  updateInput: UpdateJobhopJobLocationInput,
  listQueryInput: JobhopJobLocationQueryInput,
  listViewDto: JobhopJobLocationListResponse,
  name: 'jobhopJobLocation',
  pluralName: 'jobhopJobLocations',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopJobLocationMessagePattern);
  }
}
