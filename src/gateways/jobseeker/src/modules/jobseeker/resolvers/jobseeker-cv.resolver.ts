import { firstValueFrom } from 'rxjs';
import {
  JobSeekerCvMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerCvInput,
  UpdateJobSeekerCvInput,
  JobSeekerCvQueryInput,
  JobSeekerCvListReponse,
  JobSeekerCv,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerCv)
export class JobSeekerCvResolver extends BaseResolver<
  CreateJobSeekerCvInput,
  UpdateJobSeekerCvInput,
  JobSeekerCvQueryInput
>({
  viewDto: JobSeekerCv,
  createInput: CreateJobSeekerCvInput,
  updateInput: UpdateJobSeekerCvInput,
  listQueryInput: JobSeekerCvQueryInput,
  listViewDto: JobSeekerCvListReponse,
  name: 'jobSeekerCv',
  pluralName: 'jobSeekerCvs',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerCvMessagePattern);
  }
}
