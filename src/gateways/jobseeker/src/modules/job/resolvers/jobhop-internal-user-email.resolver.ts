import {
  JobMicroserviceConfig,
  JobhopInternalUserEmailMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopInternalUserEmail,
  JobhopInternalUserEmailListResponse,
  JobhopInternalUserEmailQueryInput,
  UpdateJobhopInternalUserEmailInput,
  CreateJobhopInternalUserEmailInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopInternalUserEmail)
export class JobhopInternalUserEmailResolver extends BaseResolver<
  CreateJobhopInternalUserEmailInput,
  UpdateJobhopInternalUserEmailInput,
  JobhopInternalUserEmailQueryInput
>({
  viewDto: JobhopInternalUserEmail,
  createInput: CreateJobhopInternalUserEmailInput,
  updateInput: UpdateJobhopInternalUserEmailInput,
  listQueryInput: JobhopInternalUserEmailQueryInput,
  listViewDto: JobhopInternalUserEmailListResponse,
  name: 'jobhopInternalUserEmail',
  pluralName: 'jobhopInternalUserEmails',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopInternalUserEmailMessagePattern);
  }
}
