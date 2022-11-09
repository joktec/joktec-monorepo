import { firstValueFrom } from 'rxjs';
import {
  OrganizationSectionMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationSectionInput,
  UpdateOrganizationSectionInput,
  OrganizationSectionQueryInput,
  OrganizationSectionListReponse,
  OrganizationSection,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationSection)
export class OrganizationSectionResolver extends BaseResolver<
  CreateOrganizationSectionInput,
  UpdateOrganizationSectionInput,
  OrganizationSectionQueryInput
>({
  viewDto: OrganizationSection,
  createInput: CreateOrganizationSectionInput,
  updateInput: UpdateOrganizationSectionInput,
  listQueryInput: OrganizationSectionQueryInput,
  listViewDto: OrganizationSectionListReponse,
  name: 'organizationSection',
  pluralName: 'organizationSections',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationSectionMessagePattern);
  }
}
