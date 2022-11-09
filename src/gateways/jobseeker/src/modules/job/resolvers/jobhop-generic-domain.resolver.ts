import {
  JobMicroserviceConfig,
  JobhopGenericDomainMessagePattern,
} from '@jobhopin/core';
import {
  BaseResolver,
  JobhopGenericDomain,
  JobhopGenericDomainListResponse,
  JobhopGenericDomainQueryInput,
  UpdateJobhopGenericDomainInput,
  CreateJobhopGenericDomainInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const jobMicroserviceConfig = new JobMicroserviceConfig();
@Resolver(() => JobhopGenericDomain)
export class JobhopGenericDomainResolver extends BaseResolver<
  CreateJobhopGenericDomainInput,
  UpdateJobhopGenericDomainInput,
  JobhopGenericDomainQueryInput
>({
  viewDto: JobhopGenericDomain,
  createInput: CreateJobhopGenericDomainInput,
  updateInput: UpdateJobhopGenericDomainInput,
  listQueryInput: JobhopGenericDomainQueryInput,
  listViewDto: JobhopGenericDomainListResponse,
  name: 'jobhopGenericDomain',
  pluralName: 'jobhopGenericDomains',
}) {
  constructor(
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
  ) {
    super(jobMicroservice, JobhopGenericDomainMessagePattern);
  }
}
