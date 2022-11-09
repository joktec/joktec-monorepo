import { firstValueFrom } from 'rxjs';
import {
  OrganizationInsiderMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationInsiderInput,
  UpdateOrganizationInsiderInput,
  OrganizationInsiderQueryInput,
  OrganizationInsiderListReponse,
  OrganizationInsider,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationInsider)
export class OrganizationInsiderResolver extends BaseResolver<
  CreateOrganizationInsiderInput,
  UpdateOrganizationInsiderInput,
  OrganizationInsiderQueryInput
>({
  viewDto: OrganizationInsider,
  createInput: CreateOrganizationInsiderInput,
  updateInput: UpdateOrganizationInsiderInput,
  listQueryInput: OrganizationInsiderQueryInput,
  listViewDto: OrganizationInsiderListReponse,
  name: 'organizationInsider',
  pluralName: 'organizationInsiders',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationInsiderMessagePattern);
  }
}
