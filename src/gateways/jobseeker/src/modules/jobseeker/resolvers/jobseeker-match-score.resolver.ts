import { firstValueFrom } from 'rxjs';
import {
  JobSeekerMatchScoreMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerMatchScoreInput,
  UpdateJobSeekerMatchScoreInput,
  JobSeekerMatchScoreQueryInput,
  JobSeekerMatchScoreListReponse,
  JobSeekerMatchScore,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerMatchScore)
export class JobSeekerMatchScoreResolver extends BaseResolver<
  CreateJobSeekerMatchScoreInput,
  UpdateJobSeekerMatchScoreInput,
  JobSeekerMatchScoreQueryInput
>({
  viewDto: JobSeekerMatchScore,
  createInput: CreateJobSeekerMatchScoreInput,
  updateInput: UpdateJobSeekerMatchScoreInput,
  listQueryInput: JobSeekerMatchScoreQueryInput,
  listViewDto: JobSeekerMatchScoreListReponse,
  name: 'jobSeekerMatchScore',
  pluralName: 'jobSeekerMatchScores',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerMatchScoreMessagePattern);
  }
}
