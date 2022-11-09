import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobUserInput,
  JobUser,
  JobUserListResponse,
  JobUserQueryInput,
  UpdateJobUserInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobUser)
export class JobUserResolver extends BaseResolver<
  CreateJobUserInput,
  UpdateJobUserInput,
  JobUserQueryInput
>({
  viewDto: JobUser,
  createInput: CreateJobUserInput,
  updateInput: UpdateJobUserInput,
  listQueryInput: JobUserQueryInput,
  listViewDto: JobUserListResponse,
  name: 'jobUser',
  pluralName: 'jobUsers',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
