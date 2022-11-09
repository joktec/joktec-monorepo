import { firstValueFrom } from 'rxjs';
import {
  OrganizationPackageHistoryMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationPackageHistoryInput,
  UpdateOrganizationPackageHistoryInput,
  OrganizationPackageHistoryQueryInput,
  OrganizationPackageHistoryListReponse,
  OrganizationPackageHistory,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationPackageHistory)
export class OrganizationPackageHistoryResolver extends BaseResolver<
  CreateOrganizationPackageHistoryInput,
  UpdateOrganizationPackageHistoryInput,
  OrganizationPackageHistoryQueryInput
>({
  viewDto: OrganizationPackageHistory,
  createInput: CreateOrganizationPackageHistoryInput,
  updateInput: UpdateOrganizationPackageHistoryInput,
  listQueryInput: OrganizationPackageHistoryQueryInput,
  listViewDto: OrganizationPackageHistoryListReponse,
  name: 'organizationPackageHistory',
  pluralName: 'organizationPackageHistorys',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationPackageHistoryMessagePattern);
  }
}
