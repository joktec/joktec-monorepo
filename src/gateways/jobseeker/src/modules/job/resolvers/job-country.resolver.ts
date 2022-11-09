import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobCountryInput,
  JobCountry,
  JobCountryListResponse,
  JobCountryQueryInput,
  UpdateJobCountryInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobCountry)
export class JobCountryResolver extends BaseResolver<
  CreateJobCountryInput,
  UpdateJobCountryInput,
  JobCountryQueryInput
>({
  viewDto: JobCountry,
  createInput: CreateJobCountryInput,
  updateInput: UpdateJobCountryInput,
  listQueryInput: JobCountryQueryInput,
  listViewDto: JobCountryListResponse,
  name: 'jobCountry',
  pluralName: 'jobCountries',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
