import {
  RecruiterJobjmcreditlogMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterJobjmcreditlog,
  RecruiterJobjmcreditlogListReponse,
  RecruiterJobjmcreditlogQueryInput,
  CreateRecruiterJobjmcreditlogInput,
  UpdateRecruiterJobjmcreditlogInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterJobjmcreditlog)
export class RecruiterJobjmcreditlogResolver extends BaseResolver<
  CreateRecruiterJobjmcreditlogInput,
  UpdateRecruiterJobjmcreditlogInput,
  RecruiterJobjmcreditlogQueryInput
>({
  viewDto: RecruiterJobjmcreditlog,
  createInput: CreateRecruiterJobjmcreditlogInput,
  updateInput: UpdateRecruiterJobjmcreditlogInput,
  listQueryInput: RecruiterJobjmcreditlogQueryInput,
  listViewDto: RecruiterJobjmcreditlogListReponse,
  name: 'recruiterJobjmcreditlog',
  pluralName: 'recruiterJobjmcreditlogs',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterJobjmcreditlogMessagePattern);
  }
}
