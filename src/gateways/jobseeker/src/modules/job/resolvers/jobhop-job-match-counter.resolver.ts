import {
  JobMicroserviceConfig,
  JobhopJobMatchCounterMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopJobMatchCounter,
  JobhopJobMatchCounterListResponse,
  JobhopJobMatchCounterQueryInput,
  UpdateJobhopJobMatchCounterInput,
  CreateJobhopJobMatchCounterInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopJobMatchCounter)
export class JobhopJobMatchCounterResolver extends BaseResolver<
  CreateJobhopJobMatchCounterInput,
  UpdateJobhopJobMatchCounterInput,
  JobhopJobMatchCounterQueryInput
>({
  viewDto: JobhopJobMatchCounter,
  createInput: CreateJobhopJobMatchCounterInput,
  updateInput: UpdateJobhopJobMatchCounterInput,
  listQueryInput: JobhopJobMatchCounterQueryInput,
  listViewDto: JobhopJobMatchCounterListResponse,
  name: 'jobhopJobMatchCounter',
  pluralName: 'jobhopJobMatchCounters',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopJobMatchCounterMessagePattern);
  }
}
