import { firstValueFrom } from 'rxjs';
import {
  OrganizationMediaMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationMediaInput,
  UpdateOrganizationMediaInput,
  OrganizationMediaQueryInput,
  OrganizationMediaListReponse,
  OrganizationMedia,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationMedia)
export class OrganizationMediaResolver extends BaseResolver<
  CreateOrganizationMediaInput,
  UpdateOrganizationMediaInput,
  OrganizationMediaQueryInput
>({
  viewDto: OrganizationMedia,
  createInput: CreateOrganizationMediaInput,
  updateInput: UpdateOrganizationMediaInput,
  listQueryInput: OrganizationMediaQueryInput,
  listViewDto: OrganizationMediaListReponse,
  name: 'organizationMedia',
  pluralName: 'organizationMedias',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationMediaMessagePattern);
  }
}
