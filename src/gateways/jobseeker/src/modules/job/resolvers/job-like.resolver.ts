import { JobMicroserviceConfig, JobLikeMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobLikeInput,
  JobLike,
  JobLikeListResponse,
  JobLikeQueryInput,
  UpdateJobLikeInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobLike)
export class JobLikeResolver extends BaseResolver<
  CreateJobLikeInput,
  UpdateJobLikeInput,
  JobLikeQueryInput
>({
  viewDto: JobLike,
  createInput: CreateJobLikeInput,
  updateInput: UpdateJobLikeInput,
  listQueryInput: JobLikeQueryInput,
  listViewDto: JobLikeListResponse,
  name: 'jobLike',
  pluralName: 'jobLikes',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobLikeMessagePattern);
  }
}
