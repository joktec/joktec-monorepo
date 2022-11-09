import {
  RecruiterJobjmcreditMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterJobjmcredit,
  RecruiterJobjmcreditListReponse,
  RecruiterJobjmcreditQueryInput,
  CreateRecruiterJobjmcreditInput,
  UpdateRecruiterJobjmcreditInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterJobjmcredit)
export class RecruiterJobjmcreditResolver extends BaseResolver<
  CreateRecruiterJobjmcreditInput,
  UpdateRecruiterJobjmcreditInput,
  RecruiterJobjmcreditQueryInput
>({
  viewDto: RecruiterJobjmcredit,
  createInput: CreateRecruiterJobjmcreditInput,
  updateInput: UpdateRecruiterJobjmcreditInput,
  listQueryInput: RecruiterJobjmcreditQueryInput,
  listViewDto: RecruiterJobjmcreditListReponse,
  name: 'recruiterJobjmcredit',
  pluralName: 'recruiterJobjmcredits',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterJobjmcreditMessagePattern);
  }
}
