import { firstValueFrom } from 'rxjs';
import {
  JobSeekerIndustryMessagePattern,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateJobSeekerIndustryInput,
  UpdateJobSeekerIndustryInput,
  JobSeekerIndustryQueryInput,
  JobSeekerIndustryListReponse,
  JobSeekerIndustry,
} from '@jobhopin/graphql';

const jobSeekerMicroserviceConfig = new JobseekerMicroserviceConfig();
@Resolver(() => JobSeekerIndustry)
export class JobSeekerIndustryResolver extends BaseResolver<
  CreateJobSeekerIndustryInput,
  UpdateJobSeekerIndustryInput,
  JobSeekerIndustryQueryInput
>({
  viewDto: JobSeekerIndustry,
  createInput: CreateJobSeekerIndustryInput,
  updateInput: UpdateJobSeekerIndustryInput,
  listQueryInput: JobSeekerIndustryQueryInput,
  listViewDto: JobSeekerIndustryListReponse,
  name: 'jobSeekerIndustry',
  pluralName: 'jobSeekerIndustrys',
}) {
  constructor(
    @Inject(jobSeekerMicroserviceConfig.name)
    private readonly jobSeekerMicroservice: ClientProxy,
  ) {
    super(jobSeekerMicroservice, JobSeekerIndustryMessagePattern);
  }
}
