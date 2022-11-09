import { firstValueFrom } from 'rxjs';
import {
  JobSeekerEmailSegmentMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerEmailSegmentInput,
  UpdateJobSeekerEmailSegmentInput,
  JobSeekerEmailSegmentQueryInput,
  JobSeekerEmailSegmentListReponse,
  JobSeekerEmailSegment,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerEmailSegment)
export class JobSeekerEmailSegmentResolver extends BaseResolver<
  CreateJobSeekerEmailSegmentInput,
  UpdateJobSeekerEmailSegmentInput,
  JobSeekerEmailSegmentQueryInput
>({
  viewDto: JobSeekerEmailSegment,
  createInput: CreateJobSeekerEmailSegmentInput,
  updateInput: UpdateJobSeekerEmailSegmentInput,
  listQueryInput: JobSeekerEmailSegmentQueryInput,
  listViewDto: JobSeekerEmailSegmentListReponse,
  name: 'jobSeekerEmailSegment',
  pluralName: 'jobSeekerEmailSegments',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerEmailSegmentMessagePattern);
  }
}
