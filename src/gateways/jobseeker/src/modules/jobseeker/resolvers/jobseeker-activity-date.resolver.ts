import { firstValueFrom } from 'rxjs';
import {
  JobSeekerActivityDateMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerActivityDateInput,
  UpdateJobSeekerActivityDateInput,
  JobSeekerActivityDateQueryInput,
  JobSeekerActivityDateListReponse,
  JobSeekerActivityDate,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerActivityDate)
export class JobSeekerActivityDateResolver extends BaseResolver<
  CreateJobSeekerActivityDateInput,
  UpdateJobSeekerActivityDateInput,
  JobSeekerActivityDateQueryInput
>({
  viewDto: JobSeekerActivityDate,
  createInput: CreateJobSeekerActivityDateInput,
  updateInput: UpdateJobSeekerActivityDateInput,
  listQueryInput: JobSeekerActivityDateQueryInput,
  listViewDto: JobSeekerActivityDateListReponse,
  name: 'jobSeekerActivityDate',
  pluralName: 'jobSeekerActivityDates',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerActivityDateMessagePattern);
  }
}
