import { firstValueFrom } from 'rxjs';
import {
  JobSeekerJobAlertMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerJobAlertInput,
  UpdateJobSeekerJobAlertInput,
  JobSeekerJobAlertQueryInput,
  JobSeekerJobAlertListReponse,
  JobSeekerJobAlert,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerJobAlert)
export class JobSeekerJobAlertResolver extends BaseResolver<
  CreateJobSeekerJobAlertInput,
  UpdateJobSeekerJobAlertInput,
  JobSeekerJobAlertQueryInput
>({
  viewDto: JobSeekerJobAlert,
  createInput: CreateJobSeekerJobAlertInput,
  updateInput: UpdateJobSeekerJobAlertInput,
  listQueryInput: JobSeekerJobAlertQueryInput,
  listViewDto: JobSeekerJobAlertListReponse,
  name: 'jobSeekerJobAlert',
  pluralName: 'jobSeekerJobAlerts',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerJobAlertMessagePattern);
  }
}
