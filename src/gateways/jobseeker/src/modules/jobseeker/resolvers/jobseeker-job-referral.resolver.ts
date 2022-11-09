import { firstValueFrom } from 'rxjs';
import {
  JobSeekerJobReferralMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerJobReferralInput,
  UpdateJobSeekerJobReferralInput,
  JobSeekerJobReferralQueryInput,
  JobSeekerJobReferralListReponse,
  JobSeekerJobReferral,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerJobReferral)
export class JobSeekerJobReferralResolver extends BaseResolver<
  CreateJobSeekerJobReferralInput,
  UpdateJobSeekerJobReferralInput,
  JobSeekerJobReferralQueryInput
>({
  viewDto: JobSeekerJobReferral,
  createInput: CreateJobSeekerJobReferralInput,
  updateInput: UpdateJobSeekerJobReferralInput,
  listQueryInput: JobSeekerJobReferralQueryInput,
  listViewDto: JobSeekerJobReferralListReponse,
  name: 'jobSeekerJobReferral',
  pluralName: 'jobSeekerJobReferrals',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerJobReferralMessagePattern);
  }
}
