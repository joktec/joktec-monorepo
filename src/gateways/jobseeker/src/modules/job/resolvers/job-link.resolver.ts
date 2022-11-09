import { JobMicroserviceConfig, JobLinkMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobLinkInput,
  JobLink,
  JobLinkListResponse,
  JobLinkQueryInput,
  UpdateJobLinkInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobLink)
export class JobLinkResolver extends BaseResolver<
  CreateJobLinkInput,
  UpdateJobLinkInput,
  JobLinkQueryInput
>({
  viewDto: JobLink,
  createInput: CreateJobLinkInput,
  updateInput: UpdateJobLinkInput,
  listQueryInput: JobLinkQueryInput,
  listViewDto: JobLinkListResponse,
  name: 'jobLink',
  pluralName: 'jobLinks',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobLinkMessagePattern);
  }
}
