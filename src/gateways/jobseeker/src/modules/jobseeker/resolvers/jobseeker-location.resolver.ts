import { firstValueFrom } from 'rxjs';
import {
  JobSeekerLocationMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerLocationInput,
  UpdateJobSeekerLocationInput,
  JobSeekerLocationQueryInput,
  JobSeekerLocationListReponse,
  JobSeekerLocation,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerLocation)
export class JobSeekerLocationResolver extends BaseResolver<
  CreateJobSeekerLocationInput,
  UpdateJobSeekerLocationInput,
  JobSeekerLocationQueryInput
>({
  viewDto: JobSeekerLocation,
  createInput: CreateJobSeekerLocationInput,
  updateInput: UpdateJobSeekerLocationInput,
  listQueryInput: JobSeekerLocationQueryInput,
  listViewDto: JobSeekerLocationListReponse,
  name: 'jobSeekerLocation',
  pluralName: 'jobSeekerLocations',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerLocationMessagePattern);
  }
}
