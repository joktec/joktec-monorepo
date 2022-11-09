import { firstValueFrom } from 'rxjs';
import {
  OrganizationReviewMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationReviewInput,
  UpdateOrganizationReviewInput,
  OrganizationReviewQueryInput,
  OrganizationReviewListReponse,
  OrganizationReview,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationReview)
export class OrganizationReviewResolver extends BaseResolver<
  CreateOrganizationReviewInput,
  UpdateOrganizationReviewInput,
  OrganizationReviewQueryInput
>({
  viewDto: OrganizationReview,
  createInput: CreateOrganizationReviewInput,
  updateInput: UpdateOrganizationReviewInput,
  listQueryInput: OrganizationReviewQueryInput,
  listViewDto: OrganizationReviewListReponse,
  name: 'organizationReview',
  pluralName: 'organizationReviews',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationReviewMessagePattern);
  }
}
