import { firstValueFrom } from 'rxjs';
import {
  OrganizationSizeMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationSizeInput,
  UpdateOrganizationSizeInput,
  OrganizationSizeQueryInput,
  OrganizationSizeListReponse,
  OrganizationSize,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationSize)
export class OrganizationSizeResolver extends BaseResolver<
  CreateOrganizationSizeInput,
  UpdateOrganizationSizeInput,
  OrganizationSizeQueryInput
>({
  viewDto: OrganizationSize,
  createInput: CreateOrganizationSizeInput,
  updateInput: UpdateOrganizationSizeInput,
  listQueryInput: OrganizationSizeQueryInput,
  listViewDto: OrganizationSizeListReponse,
  name: 'organizationSize',
  pluralName: 'organizationSizes',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationSizeMessagePattern);
  }
}
