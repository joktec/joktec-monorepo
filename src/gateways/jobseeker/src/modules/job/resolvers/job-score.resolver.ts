import { JobMicroserviceConfig, JobScoreMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobScoreInput,
  JobScore,
  JobScoreListResponse,
  JobScoreQueryInput,
  UpdateJobScoreInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobScore)
export class JobScoreResolver extends BaseResolver<
  CreateJobScoreInput,
  UpdateJobScoreInput,
  JobScoreQueryInput
>({
  viewDto: JobScore,
  createInput: CreateJobScoreInput,
  updateInput: UpdateJobScoreInput,
  listQueryInput: JobScoreQueryInput,
  listViewDto: JobScoreListResponse,
  name: 'jobScore',
  pluralName: 'jobScores',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobScoreMessagePattern);
  }
}
