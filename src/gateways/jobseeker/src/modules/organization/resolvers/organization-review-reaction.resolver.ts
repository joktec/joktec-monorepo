import { firstValueFrom } from 'rxjs';
import {
  OrganizationReviewReactionMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationReviewReactionInput,
  UpdateOrganizationReviewReactionInput,
  OrganizationReviewReactionQueryInput,
  OrganizationReviewReactionListReponse,
  OrganizationReviewReaction,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationReviewReaction)
export class OrganizationReviewReactionResolver extends BaseResolver<
  CreateOrganizationReviewReactionInput,
  UpdateOrganizationReviewReactionInput,
  OrganizationReviewReactionQueryInput
>({
  viewDto: OrganizationReviewReaction,
  createInput: CreateOrganizationReviewReactionInput,
  updateInput: UpdateOrganizationReviewReactionInput,
  listQueryInput: OrganizationReviewReactionQueryInput,
  listViewDto: OrganizationReviewReactionListReponse,
  name: 'organizationReviewReaction',
  pluralName: 'organizationReviewReactions',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationReviewReactionMessagePattern);
  }
}
