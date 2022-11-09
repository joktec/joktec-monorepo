import { firstValueFrom } from 'rxjs';
import {
  OrganizationPlatformMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationPlatformInput,
  UpdateOrganizationPlatformInput,
  OrganizationPlatformQueryInput,
  OrganizationPlatformListReponse,
  OrganizationPlatform,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationPlatform)
export class OrganizationPlatformResolver extends BaseResolver<
  CreateOrganizationPlatformInput,
  UpdateOrganizationPlatformInput,
  OrganizationPlatformQueryInput
>({
  viewDto: OrganizationPlatform,
  createInput: CreateOrganizationPlatformInput,
  updateInput: UpdateOrganizationPlatformInput,
  listQueryInput: OrganizationPlatformQueryInput,
  listViewDto: OrganizationPlatformListReponse,
  name: 'organizationPlatform',
  pluralName: 'organizationPlatforms',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationPlatformMessagePattern);
  }
}
