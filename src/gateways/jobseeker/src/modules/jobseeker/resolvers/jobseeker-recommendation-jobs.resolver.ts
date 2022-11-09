import { firstValueFrom } from 'rxjs';
import {
  JobSeekerRecommendationJobsMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerRecommendationJobsInput,
  UpdateJobSeekerRecommendationJobsInput,
  JobSeekerRecommendationJobsQueryInput,
  JobSeekerRecommendationJobsListReponse,
  JobSeekerRecommendationJobs,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerRecommendationJobs)
export class JobSeekerRecommendationJobsResolver extends BaseResolver<
  CreateJobSeekerRecommendationJobsInput,
  UpdateJobSeekerRecommendationJobsInput,
  JobSeekerRecommendationJobsQueryInput
>({
  viewDto: JobSeekerRecommendationJobs,
  createInput: CreateJobSeekerRecommendationJobsInput,
  updateInput: UpdateJobSeekerRecommendationJobsInput,
  listQueryInput: JobSeekerRecommendationJobsQueryInput,
  listViewDto: JobSeekerRecommendationJobsListReponse,
  name: 'jobSeekerRecommendationJobs',
  pluralName: 'jobSeekerRecommendationJobss',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerRecommendationJobsMessagePattern);
  }
}
