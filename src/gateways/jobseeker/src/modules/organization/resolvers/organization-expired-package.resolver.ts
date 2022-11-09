import { firstValueFrom } from 'rxjs';
import {
  OrganizationExpiredPackageMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationExpiredPackageInput,
  UpdateOrganizationExpiredPackageInput,
  OrganizationExpiredPackageQueryInput,
  OrganizationExpiredPackageListReponse,
  OrganizationExpiredPackage,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationExpiredPackage)
export class OrganizationExpiredPackageResolver extends BaseResolver<
  CreateOrganizationExpiredPackageInput,
  UpdateOrganizationExpiredPackageInput,
  OrganizationExpiredPackageQueryInput
>({
  viewDto: OrganizationExpiredPackage,
  createInput: CreateOrganizationExpiredPackageInput,
  updateInput: UpdateOrganizationExpiredPackageInput,
  listQueryInput: OrganizationExpiredPackageQueryInput,
  listViewDto: OrganizationExpiredPackageListReponse,
  name: 'organizationExpiredPackage',
  pluralName: 'organizationExpiredPackages',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationExpiredPackageMessagePattern);
  }
}
