import { firstValueFrom } from 'rxjs';
import {
  OrganizationCustomUrlMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationCustomUrlInput,
  UpdateOrganizationCustomUrlInput,
  OrganizationCustomUrlQueryInput,
  OrganizationCustomUrlListReponse,
  OrganizationCustomUrl,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationCustomUrl)
export class OrganizationCustomUrlResolver extends BaseResolver<
  CreateOrganizationCustomUrlInput,
  UpdateOrganizationCustomUrlInput,
  OrganizationCustomUrlQueryInput
>({
  viewDto: OrganizationCustomUrl,
  createInput: CreateOrganizationCustomUrlInput,
  updateInput: UpdateOrganizationCustomUrlInput,
  listQueryInput: OrganizationCustomUrlQueryInput,
  listViewDto: OrganizationCustomUrlListReponse,
  name: 'organizationCustomUrl',
  pluralName: 'organizationCustomUrls',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationCustomUrlMessagePattern);
  }
}
