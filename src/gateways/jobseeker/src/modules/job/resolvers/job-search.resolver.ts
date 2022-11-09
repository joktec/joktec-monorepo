import { JobMicroserviceConfig, JobSearchMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobSearchInput,
  JobSearch,
  JobSearchListResponse,
  JobSearchQueryInput,
  UpdateJobSearchInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobSearch)
export class JobSearchResolver extends BaseResolver<
  CreateJobSearchInput,
  UpdateJobSearchInput,
  JobSearchQueryInput
>({
  viewDto: JobSearch,
  createInput: CreateJobSearchInput,
  updateInput: UpdateJobSearchInput,
  listQueryInput: JobSearchQueryInput,
  listViewDto: JobSearchListResponse,
  name: 'jobSearch',
  pluralName: 'jobSearches',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobSearchMessagePattern);
  }
}
