import { firstValueFrom } from 'rxjs';
import {
  OrganizationReviewDetailMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationReviewDetailInput,
  UpdateOrganizationReviewDetailInput,
  OrganizationReviewDetailQueryInput,
  OrganizationReviewDetailListReponse,
  OrganizationReviewDetail,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationReviewDetail)
export class OrganizationReviewDetailResolver extends BaseResolver<
  CreateOrganizationReviewDetailInput,
  UpdateOrganizationReviewDetailInput,
  OrganizationReviewDetailQueryInput
>({
  viewDto: OrganizationReviewDetail,
  createInput: CreateOrganizationReviewDetailInput,
  updateInput: UpdateOrganizationReviewDetailInput,
  listQueryInput: OrganizationReviewDetailQueryInput,
  listViewDto: OrganizationReviewDetailListReponse,
  name: 'organizationReviewDetail',
  pluralName: 'organizationReviewDetails',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationReviewDetailMessagePattern);
  }
}
