import {
  JobMicroserviceConfig,
  JobhopNotiMessageDetailMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopNotiMessageDetail,
  JobhopNotiMessageDetailListResponse,
  JobhopNotiMessageDetailQueryInput,
  UpdateJobhopNotiMessageDetailInput,
  CreateJobhopNotiMessageDetailInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopNotiMessageDetail)
export class JobhopNotiMessageDetailResolver extends BaseResolver<
  CreateJobhopNotiMessageDetailInput,
  UpdateJobhopNotiMessageDetailInput,
  JobhopNotiMessageDetailQueryInput
>({
  viewDto: JobhopNotiMessageDetail,
  createInput: CreateJobhopNotiMessageDetailInput,
  updateInput: UpdateJobhopNotiMessageDetailInput,
  listQueryInput: JobhopNotiMessageDetailQueryInput,
  listViewDto: JobhopNotiMessageDetailListResponse,
  name: 'jobhopNotiMessageDetail',
  pluralName: 'jobhopNotiMessageDetails',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopNotiMessageDetailMessagePattern);
  }
}
