import { JobMicroserviceConfig, JobMessagePattern } from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobDistrictInput,
  JobDistrict,
  JobDistrictListResponse,
  JobDistrictQueryInput,
  UpdateJobDistrictInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobDistrict)
export class JobDistrictResolver extends BaseResolver<
  CreateJobDistrictInput,
  UpdateJobDistrictInput,
  JobDistrictQueryInput
>({
  viewDto: JobDistrict,
  createInput: CreateJobDistrictInput,
  updateInput: UpdateJobDistrictInput,
  listQueryInput: JobDistrictQueryInput,
  listViewDto: JobDistrictListResponse,
  name: 'jobDistrict',
  pluralName: 'jobDistricts',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMessagePattern);
  }
}
