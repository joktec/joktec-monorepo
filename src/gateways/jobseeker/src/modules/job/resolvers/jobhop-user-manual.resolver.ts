import {
  JobMicroserviceConfig,
  JobhopUserManualMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopUserManualInput,
  JobhopUserManual,
  JobhopUserManualListResponse,
  JobhopUserManualQueryInput,
  UpdateJobhopUserManualInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopUserManual)
export class JobhopUserManualResolver extends BaseResolver<
  CreateJobhopUserManualInput,
  UpdateJobhopUserManualInput,
  JobhopUserManualQueryInput
>({
  viewDto: JobhopUserManual,
  createInput: CreateJobhopUserManualInput,
  updateInput: UpdateJobhopUserManualInput,
  listQueryInput: JobhopUserManualQueryInput,
  listViewDto: JobhopUserManualListResponse,
  name: 'jobhopUserManual',
  pluralName: 'jobhopUserManuals',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopUserManualMessagePattern);
  }
}
