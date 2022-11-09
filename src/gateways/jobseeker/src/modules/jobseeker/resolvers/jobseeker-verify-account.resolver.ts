import { firstValueFrom } from 'rxjs';
import {
  JobSeekerVerifyAccountMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerVerifyAccountInput,
  UpdateJobSeekerVerifyAccountInput,
  JobSeekerVerifyAccountQueryInput,
  JobSeekerVerifyAccountListReponse,
  JobSeekerVerifyAccount,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerVerifyAccount)
export class JobSeekerVerifyAccountResolver extends BaseResolver<
  CreateJobSeekerVerifyAccountInput,
  UpdateJobSeekerVerifyAccountInput,
  JobSeekerVerifyAccountQueryInput
>({
  viewDto: JobSeekerVerifyAccount,
  createInput: CreateJobSeekerVerifyAccountInput,
  updateInput: UpdateJobSeekerVerifyAccountInput,
  listQueryInput: JobSeekerVerifyAccountQueryInput,
  listViewDto: JobSeekerVerifyAccountListReponse,
  name: 'jobSeekerVerifyAccount',
  pluralName: 'jobSeekerVerifyAccounts',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerVerifyAccountMessagePattern);
  }
}
