import {
  JobMicroserviceConfig,
  JobhopJobDefaultImageMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopJobDefaultImage,
  JobhopJobDefaultImageListResponse,
  JobhopJobDefaultImageQueryInput,
  UpdateJobhopJobDefaultImageInput,
  CreateJobhopJobDefaultImageInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopJobDefaultImage)
export class JobhopJobDefaultImageResolver extends BaseResolver<
  CreateJobhopJobDefaultImageInput,
  UpdateJobhopJobDefaultImageInput,
  JobhopJobDefaultImageQueryInput
>({
  viewDto: JobhopJobDefaultImage,
  createInput: CreateJobhopJobDefaultImageInput,
  updateInput: UpdateJobhopJobDefaultImageInput,
  listQueryInput: JobhopJobDefaultImageQueryInput,
  listViewDto: JobhopJobDefaultImageListResponse,
  name: 'jobhopJobDefaultImage',
  pluralName: 'jobhopJobDefaultImages',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopJobDefaultImageMessagePattern);
  }
}
