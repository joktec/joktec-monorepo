import {
  JobMicroserviceConfig,
  JobhopOrganizationBenefitMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopOrganizationBenefit,
  JobhopOrganizationBenefitListResponse,
  JobhopOrganizationBenefitQueryInput,
  UpdateJobhopOrganizationBenefitInput,
  CreateJobhopOrganizationBenefitInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopOrganizationBenefit)
export class JobhopOrganizationBenefitResolver extends BaseResolver<
  CreateJobhopOrganizationBenefitInput,
  UpdateJobhopOrganizationBenefitInput,
  JobhopOrganizationBenefitQueryInput
>({
  viewDto: JobhopOrganizationBenefit,
  createInput: CreateJobhopOrganizationBenefitInput,
  updateInput: UpdateJobhopOrganizationBenefitInput,
  listQueryInput: JobhopOrganizationBenefitQueryInput,
  listViewDto: JobhopOrganizationBenefitListResponse,
  name: 'jobhopOrganizationBenefit',
  pluralName: 'jobhopOrganizationBenefits',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopOrganizationBenefitMessagePattern);
  }
}
