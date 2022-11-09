import {
  RecruiterJobjmcreditplanMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterJobjmcreditplan,
  RecruiterJobjmcreditplanListReponse,
  RecruiterJobjmcreditplanQueryInput,
  CreateRecruiterJobjmcreditplanInput,
  UpdateRecruiterJobjmcreditplanInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterJobjmcreditplan)
export class RecruiterJobjmcreditplanResolver extends BaseResolver<
  CreateRecruiterJobjmcreditplanInput,
  UpdateRecruiterJobjmcreditplanInput,
  RecruiterJobjmcreditplanQueryInput
>({
  viewDto: RecruiterJobjmcreditplan,
  createInput: CreateRecruiterJobjmcreditplanInput,
  updateInput: UpdateRecruiterJobjmcreditplanInput,
  listQueryInput: RecruiterJobjmcreditplanQueryInput,
  listViewDto: RecruiterJobjmcreditplanListReponse,
  name: 'recruiterJobjmcreditplan',
  pluralName: 'recruiterJobjmcreditplans',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterJobjmcreditplanMessagePattern);
  }
}
