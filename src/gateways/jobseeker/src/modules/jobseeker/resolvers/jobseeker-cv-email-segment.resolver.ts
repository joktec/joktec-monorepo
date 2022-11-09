import { firstValueFrom } from 'rxjs';
import {
  JobSeekerCvEmailSegmentMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerCvEmailSegmentInput,
  UpdateJobSeekerCvEmailSegmentInput,
  JobSeekerCvEmailSegmentQueryInput,
  JobSeekerCvEmailSegmentListReponse,
  JobSeekerCvEmailSegment,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerCvEmailSegment)
export class JobSeekerCvEmailSegmentResolver extends BaseResolver<
  CreateJobSeekerCvEmailSegmentInput,
  UpdateJobSeekerCvEmailSegmentInput,
  JobSeekerCvEmailSegmentQueryInput
>({
  viewDto: JobSeekerCvEmailSegment,
  createInput: CreateJobSeekerCvEmailSegmentInput,
  updateInput: UpdateJobSeekerCvEmailSegmentInput,
  listQueryInput: JobSeekerCvEmailSegmentQueryInput,
  listViewDto: JobSeekerCvEmailSegmentListReponse,
  name: 'jobSeekerCvEmailSegment',
  pluralName: 'jobSeekerCvEmailSegments',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerCvEmailSegmentMessagePattern);
  }
}
