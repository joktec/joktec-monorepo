import { firstValueFrom } from 'rxjs';
import {
  OrganizationLicenseVerifyMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationLicenseVerifyInput,
  UpdateOrganizationLicenseVerifyInput,
  OrganizationLicenseVerifyQueryInput,
  OrganizationLicenseVerifyListReponse,
  OrganizationLicenseVerify,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationLicenseVerify)
export class OrganizationLicenseVerifyResolver extends BaseResolver<
  CreateOrganizationLicenseVerifyInput,
  UpdateOrganizationLicenseVerifyInput,
  OrganizationLicenseVerifyQueryInput
>({
  viewDto: OrganizationLicenseVerify,
  createInput: CreateOrganizationLicenseVerifyInput,
  updateInput: UpdateOrganizationLicenseVerifyInput,
  listQueryInput: OrganizationLicenseVerifyQueryInput,
  listViewDto: OrganizationLicenseVerifyListReponse,
  name: 'organizationLicenseVerify',
  pluralName: 'organizationLicenseVerifies',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationLicenseVerifyMessagePattern);
  }
}
