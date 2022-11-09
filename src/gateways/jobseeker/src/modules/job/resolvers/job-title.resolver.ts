import { JobMicroserviceConfig, JobTitleMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  JobTitle,
  JobTitleListResponse,
  JobTitleQueryInput,
  UpdateJobTitleInput,
  CreateJobTitleInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobTitle)
export class JobTitleResolver extends BaseResolver<
  CreateJobTitleInput,
  UpdateJobTitleInput,
  JobTitleQueryInput
>({
  viewDto: JobTitle,
  createInput: CreateJobTitleInput,
  updateInput: UpdateJobTitleInput,
  listQueryInput: JobTitleQueryInput,
  listViewDto: JobTitleListResponse,
  name: 'jobTitle',
  pluralName: 'jobTitles',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobTitleMessagePattern);
  }
}
