import { firstValueFrom } from 'rxjs';
import {
  OrganizationRecruiterMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationRecruiterInput,
  UpdateOrganizationRecruiterInput,
  OrganizationRecruiterQueryInput,
  OrganizationRecruiterListReponse,
  OrganizationRecruiter,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationRecruiter)
export class OrganizationRecruiterResolver extends BaseResolver<
  CreateOrganizationRecruiterInput,
  UpdateOrganizationRecruiterInput,
  OrganizationRecruiterQueryInput
>({
  viewDto: OrganizationRecruiter,
  createInput: CreateOrganizationRecruiterInput,
  updateInput: UpdateOrganizationRecruiterInput,
  listQueryInput: OrganizationRecruiterQueryInput,
  listViewDto: OrganizationRecruiterListReponse,
  name: 'organizationRecruiter',
  pluralName: 'organizationRecruiters',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationRecruiterMessagePattern);
  }
}
