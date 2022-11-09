import { firstValueFrom } from 'rxjs';
import {
  JobSeekerJobFunctionMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerJobFunctionInput,
  UpdateJobSeekerJobFunctionInput,
  JobSeekerJobFunctionQueryInput,
  JobSeekerJobFunctionListReponse,
  JobSeekerJobFunction,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerJobFunction)
export class JobSeekerJobFunctionResolver extends BaseResolver<
  CreateJobSeekerJobFunctionInput,
  UpdateJobSeekerJobFunctionInput,
  JobSeekerJobFunctionQueryInput
>({
  viewDto: JobSeekerJobFunction,
  createInput: CreateJobSeekerJobFunctionInput,
  updateInput: UpdateJobSeekerJobFunctionInput,
  listQueryInput: JobSeekerJobFunctionQueryInput,
  listViewDto: JobSeekerJobFunctionListReponse,
  name: 'jobSeekerJobFunction',
  pluralName: 'jobSeekerJobFunctions',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerJobFunctionMessagePattern);
  }
}
