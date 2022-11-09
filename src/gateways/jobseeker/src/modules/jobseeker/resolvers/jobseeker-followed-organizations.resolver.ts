import { firstValueFrom } from 'rxjs';
import {
  JobSeekerFollowedOrganizationsMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerFollowedOrganizationInput,
  UpdateJobSeekerFollowedOrganizationInput,
  JobSeekerFollowedOrganizationQueryInput,
  JobSeekerFollowedOrganizationListReponse,
  JobSeekerFollowedOrganization,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerFollowedOrganization)
export class JobSeekerFollowedOrganizationResolver extends BaseResolver<
  CreateJobSeekerFollowedOrganizationInput,
  UpdateJobSeekerFollowedOrganizationInput,
  JobSeekerFollowedOrganizationQueryInput
>({
  viewDto: JobSeekerFollowedOrganization,
  createInput: CreateJobSeekerFollowedOrganizationInput,
  updateInput: UpdateJobSeekerFollowedOrganizationInput,
  listQueryInput: JobSeekerFollowedOrganizationQueryInput,
  listViewDto: JobSeekerFollowedOrganizationListReponse,
  name: 'jobSeekerFollowedOrganization',
  pluralName: 'jobSeekerFollowedOrganizations',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerFollowedOrganizationsMessagePattern);
  }
}
