import { firstValueFrom } from 'rxjs';
import {
  JobSeekerEntityViewMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerEntityViewInput,
  UpdateJobSeekerEntityViewInput,
  JobSeekerEntityViewQueryInput,
  JobSeekerEntityViewListReponse,
  JobSeekerEntityView,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerEntityView)
export class JobSeekerEntityViewResolver extends BaseResolver<
  CreateJobSeekerEntityViewInput,
  UpdateJobSeekerEntityViewInput,
  JobSeekerEntityViewQueryInput
>({
  viewDto: JobSeekerEntityView,
  createInput: CreateJobSeekerEntityViewInput,
  updateInput: UpdateJobSeekerEntityViewInput,
  listQueryInput: JobSeekerEntityViewQueryInput,
  listViewDto: JobSeekerEntityViewListReponse,
  name: 'jobSeekerEntityView',
  pluralName: 'jobSeekerEntityViews',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerEntityViewMessagePattern);
  }
}
