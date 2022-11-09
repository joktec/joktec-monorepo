import { firstValueFrom } from 'rxjs';
import {
  JobSeekerTitleCaseMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerTitleCaseInput,
  UpdateJobSeekerTitleCaseInput,
  JobSeekerTitleCaseQueryInput,
  JobSeekerTitleCaseListReponse,
  JobSeekerTitleCase,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerTitleCase)
export class JobSeekerTitleCaseResolver extends BaseResolver<
  CreateJobSeekerTitleCaseInput,
  UpdateJobSeekerTitleCaseInput,
  JobSeekerTitleCaseQueryInput
>({
  viewDto: JobSeekerTitleCase,
  createInput: CreateJobSeekerTitleCaseInput,
  updateInput: UpdateJobSeekerTitleCaseInput,
  listQueryInput: JobSeekerTitleCaseQueryInput,
  listViewDto: JobSeekerTitleCaseListReponse,
  name: 'jobSeekerTitleCase',
  pluralName: 'jobSeekerTitleCases',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerTitleCaseMessagePattern);
  }
}
