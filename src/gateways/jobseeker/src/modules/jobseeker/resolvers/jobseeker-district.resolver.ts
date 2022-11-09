import { firstValueFrom } from 'rxjs';
import {
  JobSeekerDistrictMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerDistrictInput,
  UpdateJobSeekerDistrictInput,
  JobSeekerDistrictQueryInput,
  JobSeekerDistrictListReponse,
  JobSeekerDistrict,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerDistrict)
export class JobSeekerDistrictResolver extends BaseResolver<
  CreateJobSeekerDistrictInput,
  UpdateJobSeekerDistrictInput,
  JobSeekerDistrictQueryInput
>({
  viewDto: JobSeekerDistrict,
  createInput: CreateJobSeekerDistrictInput,
  updateInput: UpdateJobSeekerDistrictInput,
  listQueryInput: JobSeekerDistrictQueryInput,
  listViewDto: JobSeekerDistrictListReponse,
  name: 'jobSeekerDistrict',
  pluralName: 'jobSeekerDistricts',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerDistrictMessagePattern);
  }
}
