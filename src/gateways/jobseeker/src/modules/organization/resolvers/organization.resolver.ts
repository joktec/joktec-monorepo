import { firstValueFrom } from 'rxjs';
import {
  OrganizationMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  OrganizationQueryInput,
  OrganizationListReponse,
  Organization,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => Organization)
export class OrganizationResolver extends BaseResolver<
  CreateOrganizationInput,
  UpdateOrganizationInput,
  OrganizationQueryInput
>({
  viewDto: Organization,
  createInput: CreateOrganizationInput,
  updateInput: UpdateOrganizationInput,
  listQueryInput: OrganizationQueryInput,
  listViewDto: OrganizationListReponse,
  name: 'organization',
  pluralName: 'organizations',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationMessagePattern);
  }
}
