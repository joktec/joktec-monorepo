import {
  JobMicroserviceConfig,
  JobhopBlacklistDomainMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopBlackListDomain,
  JobhopBlackListDomainListResponse,
  JobhopBlackListDomainQueryInput,
  UpdateJobhopBlackListDomainInput,
  CreateJobhopBlackListDomainInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopBlackListDomain)
export class JobhopBlackListDomainResolver extends BaseResolver<
  CreateJobhopBlackListDomainInput,
  UpdateJobhopBlackListDomainInput,
  JobhopBlackListDomainQueryInput
>({
  viewDto: JobhopBlackListDomain,
  createInput: CreateJobhopBlackListDomainInput,
  updateInput: UpdateJobhopBlackListDomainInput,
  listQueryInput: JobhopBlackListDomainQueryInput,
  listViewDto: JobhopBlackListDomainListResponse,
  name: 'jobhopBlackListDomain',
  pluralName: 'jobhopBlackListDomains',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopBlacklistDomainMessagePattern);
  }
}
