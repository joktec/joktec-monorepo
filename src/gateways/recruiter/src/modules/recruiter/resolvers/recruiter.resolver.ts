import {
  RecruiterMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  Recruiter,
  RecruiterListReponse,
  RecruiterQueryInput,
  CreateRecruiterInput,
  UpdateRecruiterInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => Recruiter)
export class RecruiterResolver extends BaseResolver<
  CreateRecruiterInput,
  UpdateRecruiterInput,
  RecruiterQueryInput
>({
  viewDto: Recruiter,
  createInput: CreateRecruiterInput,
  updateInput: UpdateRecruiterInput,
  listQueryInput: RecruiterQueryInput,
  listViewDto: RecruiterListReponse,
  name: 'recruiter',
  pluralName: 'recruiters',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterMessagePattern);
  }
}
