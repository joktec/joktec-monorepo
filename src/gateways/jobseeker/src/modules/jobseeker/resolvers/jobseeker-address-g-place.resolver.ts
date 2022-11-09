import { firstValueFrom } from 'rxjs';
import {
  JobSeekerAddressGPlaceMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerAddressGPlaceInput,
  UpdateJobSeekerAddressGPlaceInput,
  JobSeekerAddressGPlaceQueryInput,
  JobSeekerAddressGPlaceListReponse,
  JobSeekerAddressGPlace,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerAddressGPlace)
export class JobSeekerAddressGPlaceResolver extends BaseResolver<
  CreateJobSeekerAddressGPlaceInput,
  UpdateJobSeekerAddressGPlaceInput,
  JobSeekerAddressGPlaceQueryInput
>({
  viewDto: JobSeekerAddressGPlace,
  createInput: CreateJobSeekerAddressGPlaceInput,
  updateInput: UpdateJobSeekerAddressGPlaceInput,
  listQueryInput: JobSeekerAddressGPlaceQueryInput,
  listViewDto: JobSeekerAddressGPlaceListReponse,
  name: 'jobSeekerAddressGPlace',
  pluralName: 'jobSeekerAddressGPlaces',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerAddressGPlaceMessagePattern);
  }
}
