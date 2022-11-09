import {
  JobMicroserviceConfig,
  JobhopUserAttemptLoginMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobhopUserAttemptLoginInput,
  JobhopUserAttemptLogin,
  JobhopUserAttemptLoginListResponse,
  JobhopUserAttemptLoginQueryInput,
  UpdateJobhopUserAttemptLoginInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopUserAttemptLogin)
export class JobhopUserAttemptLoginResolver extends BaseResolver<
  CreateJobhopUserAttemptLoginInput,
  UpdateJobhopUserAttemptLoginInput,
  JobhopUserAttemptLoginQueryInput
>({
  viewDto: JobhopUserAttemptLogin,
  createInput: CreateJobhopUserAttemptLoginInput,
  updateInput: UpdateJobhopUserAttemptLoginInput,
  listQueryInput: JobhopUserAttemptLoginQueryInput,
  listViewDto: JobhopUserAttemptLoginListResponse,
  name: 'jobhopUserAttemptLogin',
  pluralName: 'jobhopUserAttemptLogins',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopUserAttemptLoginMessagePattern);
  }
}
