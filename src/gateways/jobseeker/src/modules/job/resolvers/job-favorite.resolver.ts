import {
  JobMicroserviceConfig,
  JobFavoriteMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobFavoriteInput,
  JobFavorite,
  JobFavoriteListResponse,
  JobFavoriteQueryInput,
  UpdateJobFavoriteInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobFavorite)
export class JobFavoriteResolver extends BaseResolver<
  CreateJobFavoriteInput,
  UpdateJobFavoriteInput,
  JobFavoriteQueryInput
>({
  viewDto: JobFavorite,
  createInput: CreateJobFavoriteInput,
  updateInput: UpdateJobFavoriteInput,
  listQueryInput: JobFavoriteQueryInput,
  listViewDto: JobFavoriteListResponse,
  name: 'jobFavorite',
  pluralName: 'jobFavorites',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobFavoriteMessagePattern);
  }
}
