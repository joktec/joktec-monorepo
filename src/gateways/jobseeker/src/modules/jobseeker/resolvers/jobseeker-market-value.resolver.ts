import { firstValueFrom } from 'rxjs';
import {
  JobSeekerMarketValueMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerMarketValueInput,
  UpdateJobSeekerMarketValueInput,
  JobSeekerMarketValueQueryInput,
  JobSeekerMarketValueListReponse,
  JobSeekerMarketValue,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerMarketValue)
export class JobSeekerMarketValueResolver extends BaseResolver<
  CreateJobSeekerMarketValueInput,
  UpdateJobSeekerMarketValueInput,
  JobSeekerMarketValueQueryInput
>({
  viewDto: JobSeekerMarketValue,
  createInput: CreateJobSeekerMarketValueInput,
  updateInput: UpdateJobSeekerMarketValueInput,
  listQueryInput: JobSeekerMarketValueQueryInput,
  listViewDto: JobSeekerMarketValueListReponse,
  name: 'jobSeekerMarketValue',
  pluralName: 'jobSeekerMarketValues',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerMarketValueMessagePattern);
  }
}
