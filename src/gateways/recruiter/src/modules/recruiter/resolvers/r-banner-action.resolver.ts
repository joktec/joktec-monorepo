import {
  RBannerActionMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RBannerAction,
  RBannerActionListReponse,
  RBannerActionQueryInput,
  CreateRBannerActionInput,
  UpdateRBannerActionInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RBannerAction)
export class RBannerActionResolver extends BaseResolver<
  CreateRBannerActionInput,
  UpdateRBannerActionInput,
  RBannerActionQueryInput
>({
  viewDto: RBannerAction,
  createInput: CreateRBannerActionInput,
  updateInput: UpdateRBannerActionInput,
  listQueryInput: RBannerActionQueryInput,
  listViewDto: RBannerActionListReponse,
  name: 'rbannerAction',
  pluralName: 'rbannerActions',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RBannerActionMessagePattern);
  }
}
