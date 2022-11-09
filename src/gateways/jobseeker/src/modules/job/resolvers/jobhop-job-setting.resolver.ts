import {
  JobMicroserviceConfig,
  JobhopJobsettingMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopJobSetting,
  JobhopJobSettingListResponse,
  JobhopJobSettingQueryInput,
  UpdateJobhopJobSettingInput,
  CreateJobhopJobSettingInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopJobSetting)
export class JobhopJobSettingResolver extends BaseResolver<
  CreateJobhopJobSettingInput,
  UpdateJobhopJobSettingInput,
  JobhopJobSettingQueryInput
>({
  viewDto: JobhopJobSetting,
  createInput: CreateJobhopJobSettingInput,
  updateInput: UpdateJobhopJobSettingInput,
  listQueryInput: JobhopJobSettingQueryInput,
  listViewDto: JobhopJobSettingListResponse,
  name: 'jobhopJobSetting',
  pluralName: 'jobhopJobSettings',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopJobsettingMessagePattern);
  }
}
