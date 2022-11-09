import { firstValueFrom } from 'rxjs';
import {
  OrganizationLeaderProfileMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationLeaderProfileInput,
  UpdateOrganizationLeaderProfileInput,
  OrganizationLeaderProfileQueryInput,
  OrganizationLeaderProfileListReponse,
  OrganizationLeaderProfile,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationLeaderProfile)
export class OrganizationLeaderProfileResolver extends BaseResolver<
  CreateOrganizationLeaderProfileInput,
  UpdateOrganizationLeaderProfileInput,
  OrganizationLeaderProfileQueryInput
>({
  viewDto: OrganizationLeaderProfile,
  createInput: CreateOrganizationLeaderProfileInput,
  updateInput: UpdateOrganizationLeaderProfileInput,
  listQueryInput: OrganizationLeaderProfileQueryInput,
  listViewDto: OrganizationLeaderProfileListReponse,
  name: 'organizationLeaderProfile',
  pluralName: 'organizationLeaderProfiles',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationLeaderProfileMessagePattern);
  }
}
