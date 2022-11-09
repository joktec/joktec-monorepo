import { firstValueFrom } from 'rxjs';
import {
  OrganizationPackageMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationPackageInput,
  UpdateOrganizationPackageInput,
  OrganizationPackageQueryInput,
  OrganizationPackageListReponse,
  OrganizationPackage,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationPackage)
export class OrganizationPackageResolver extends BaseResolver<
  CreateOrganizationPackageInput,
  UpdateOrganizationPackageInput,
  OrganizationPackageQueryInput
>({
  viewDto: OrganizationPackage,
  createInput: CreateOrganizationPackageInput,
  updateInput: UpdateOrganizationPackageInput,
  listQueryInput: OrganizationPackageQueryInput,
  listViewDto: OrganizationPackageListReponse,
  name: 'organizationPackage',
  pluralName: 'organizationPackages',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationPackageMessagePattern);
  }
}
