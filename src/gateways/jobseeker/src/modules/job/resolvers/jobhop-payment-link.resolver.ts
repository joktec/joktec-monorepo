import {
  JobMicroserviceConfig,
  JobhopPaymentLinkMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopPaymentLink,
  JobhopPaymentLinkListResponse,
  JobhopPaymentLinkQueryInput,
  UpdateJobhopPaymentLinkInput,
  CreateJobhopPaymentLinkInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopPaymentLink)
export class JobhopPaymentLinkResolver extends BaseResolver<
  CreateJobhopPaymentLinkInput,
  UpdateJobhopPaymentLinkInput,
  JobhopPaymentLinkQueryInput
>({
  viewDto: JobhopPaymentLink,
  createInput: CreateJobhopPaymentLinkInput,
  updateInput: UpdateJobhopPaymentLinkInput,
  listQueryInput: JobhopPaymentLinkQueryInput,
  listViewDto: JobhopPaymentLinkListResponse,
  name: 'jobhopPaymentLink',
  pluralName: 'jobhopPaymentLinks',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopPaymentLinkMessagePattern);
  }
}
