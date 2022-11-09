import { firstValueFrom } from 'rxjs';
import {
  OrganizationSimilarCompanyMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationSimilarCompanyInput,
  UpdateOrganizationSimilarCompanyInput,
  OrganizationSimilarCompanyQueryInput,
  OrganizationSimilarCompanyListReponse,
  OrganizationSimilarCompany,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationSimilarCompany)
export class OrganizationSimilarCompanyResolver extends BaseResolver<
  CreateOrganizationSimilarCompanyInput,
  UpdateOrganizationSimilarCompanyInput,
  OrganizationSimilarCompanyQueryInput
>({
  viewDto: OrganizationSimilarCompany,
  createInput: CreateOrganizationSimilarCompanyInput,
  updateInput: UpdateOrganizationSimilarCompanyInput,
  listQueryInput: OrganizationSimilarCompanyQueryInput,
  listViewDto: OrganizationSimilarCompanyListReponse,
  name: 'organizationSimilarCompany',
  pluralName: 'organizationSimilarCompanies',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationSimilarCompanyMessagePattern);
  }
}
