import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobRecruiterInput,
  JobRecruiter,
  JobRecruiterListResponse,
  JobRecruiterQueryInput,
  UpdateJobRecruiterInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobRecruiter)
export class JobRecruiterResolver extends BaseResolver<
  CreateJobRecruiterInput,
  UpdateJobRecruiterInput,
  JobRecruiterQueryInput
>({
  viewDto: JobRecruiter,
  createInput: CreateJobRecruiterInput,
  updateInput: UpdateJobRecruiterInput,
  listQueryInput: JobRecruiterQueryInput,
  listViewDto: JobRecruiterListResponse,
  name: 'jobRecruiter',
  pluralName: 'jobRecruiters',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
