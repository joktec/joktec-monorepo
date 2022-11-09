import { firstValueFrom } from 'rxjs';
import {
  OrganizationArticleMessagePattern,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateOrganizationArticleInput,
  UpdateOrganizationArticleInput,
  OrganizationArticleQueryInput,
  OrganizationArticleListReponse,
  OrganizationArticle,
} from '@jobhopin/graphql';

const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
@Resolver(() => OrganizationArticle)
export class OrganizationArticleResolver extends BaseResolver<
  CreateOrganizationArticleInput,
  UpdateOrganizationArticleInput,
  OrganizationArticleQueryInput
>({
  viewDto: OrganizationArticle,
  createInput: CreateOrganizationArticleInput,
  updateInput: UpdateOrganizationArticleInput,
  listQueryInput: OrganizationArticleQueryInput,
  listViewDto: OrganizationArticleListReponse,
  name: 'organizationArticle',
  pluralName: 'organizationArticles',
}) {
  constructor(
    @Inject(organizationMicroserviceConfig.name)
    private readonly organizationMicroservice: ClientProxy,
  ) {
    super(organizationMicroservice, OrganizationArticleMessagePattern);
  }
}
