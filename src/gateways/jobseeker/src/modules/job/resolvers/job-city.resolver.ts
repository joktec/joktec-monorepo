import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobCityInput,
  JobCity,
  JobCityListResponse,
  JobCityQueryInput,
  UpdateJobCityInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobCity)
export class JobCityResolver extends BaseResolver<
  CreateJobCityInput,
  UpdateJobCityInput,
  JobCityQueryInput
>({
  viewDto: JobCity,
  createInput: CreateJobCityInput,
  updateInput: UpdateJobCityInput,
  listQueryInput: JobCityQueryInput,
  listViewDto: JobCityListResponse,
  name: 'jobCity',
  pluralName: 'jobCities',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
