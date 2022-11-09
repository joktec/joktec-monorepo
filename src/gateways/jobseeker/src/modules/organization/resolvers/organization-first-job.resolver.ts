import { firstValueFrom } from 'rxjs';
import {
  OrganizationFirstJobMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationFirstJobInput,
  UpdateOrganizationFirstJobInput,
  OrganizationFirstJobQueryInput,
  OrganizationFirstJobListReponse,
  OrganizationFirstJob,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationFirstJob)
export class OrganizationFirstJobResolver extends BaseResolver<
  CreateOrganizationFirstJobInput,
  UpdateOrganizationFirstJobInput,
  OrganizationFirstJobQueryInput
>({
  viewDto: OrganizationFirstJob,
  createInput: CreateOrganizationFirstJobInput,
  updateInput: UpdateOrganizationFirstJobInput,
  listQueryInput: OrganizationFirstJobQueryInput,
  listViewDto: OrganizationFirstJobListReponse,
  name: 'organizationFirstJob',
  pluralName: 'organizationFirstJobs',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationFirstJobMessagePattern);
  }
}
