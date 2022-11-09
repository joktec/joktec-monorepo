import {
  RBannerMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RBanner,
  RBannerListReponse,
  RBannerQueryInput,
  CreateRBannerInput,
  UpdateRBannerInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RBanner)
export class RBannerResolver extends BaseResolver<
  CreateRBannerInput,
  UpdateRBannerInput,
  RBannerQueryInput
>({
  viewDto: RBanner,
  createInput: CreateRBannerInput,
  updateInput: UpdateRBannerInput,
  listQueryInput: RBannerQueryInput,
  listViewDto: RBannerListReponse,
  name: 'rBanner',
  pluralName: 'rBanners',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RBannerMessagePattern);
  }
}
