import { firstValueFrom } from 'rxjs';
import {
  OrganizationPackageLogMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationPackageLogInput,
  UpdateOrganizationPackageLogInput,
  OrganizationPackageLogQueryInput,
  OrganizationPackageLogListReponse,
  OrganizationPackageLog,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationPackageLog)
export class OrganizationPackageLogResolver extends BaseResolver<
  CreateOrganizationPackageLogInput,
  UpdateOrganizationPackageLogInput,
  OrganizationPackageLogQueryInput
>({
  viewDto: OrganizationPackageLog,
  createInput: CreateOrganizationPackageLogInput,
  updateInput: UpdateOrganizationPackageLogInput,
  listQueryInput: OrganizationPackageLogQueryInput,
  listViewDto: OrganizationPackageLogListReponse,
  name: 'organizationPackageLog',
  pluralName: 'organizationPackageLogs',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationPackageLogMessagePattern);
  }
}
