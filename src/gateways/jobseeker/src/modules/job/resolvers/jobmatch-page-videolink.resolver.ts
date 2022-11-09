import {
  JobMicroserviceConfig,
  JobMatchPageVideoLinkMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  CreateJobMatchPageVideoLinkInput,
  JobMatchPageVideoLink,
  JobMatchPageVideoLinkListResponse,
  JobMatchPageVideoLinkQueryInput,
  UpdateJobMatchPageVideoLinkInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobMatchPageVideoLink)
export class JobMatchPageVideoLinkResolver extends BaseResolver<
  CreateJobMatchPageVideoLinkInput,
  UpdateJobMatchPageVideoLinkInput,
  JobMatchPageVideoLinkQueryInput
>({
  viewDto: JobMatchPageVideoLink,
  createInput: CreateJobMatchPageVideoLinkInput,
  updateInput: UpdateJobMatchPageVideoLinkInput,
  listQueryInput: JobMatchPageVideoLinkQueryInput,
  listViewDto: JobMatchPageVideoLinkListResponse,
  name: 'jobMatchPageVideoLink',
  pluralName: 'jobMatchPageVideoLinks',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobMatchPageVideoLinkMessagePattern);
  }
}
