import { firstValueFrom } from 'rxjs';
import {
  JobSeekerDirectlyApplyMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerDirectlyApplyInput,
  UpdateJobSeekerDirectlyApplyInput,
  JobSeekerDirectlyApplyQueryInput,
  JobSeekerDirectlyApplyListReponse,
  JobSeekerDirectlyApply,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerDirectlyApply)
export class JobSeekerDirectlyApplyResolver extends BaseResolver<
  CreateJobSeekerDirectlyApplyInput,
  UpdateJobSeekerDirectlyApplyInput,
  JobSeekerDirectlyApplyQueryInput
>({
  viewDto: JobSeekerDirectlyApply,
  createInput: CreateJobSeekerDirectlyApplyInput,
  updateInput: UpdateJobSeekerDirectlyApplyInput,
  listQueryInput: JobSeekerDirectlyApplyQueryInput,
  listViewDto: JobSeekerDirectlyApplyListReponse,
  name: 'jobSeekerDirectlyApply',
  pluralName: 'jobSeekerDirectlyApplys',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerDirectlyApplyMessagePattern);
  }
}
