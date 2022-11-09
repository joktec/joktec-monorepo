import {
  RecruiterActivityMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterActivity,
  RecruiterActivityListReponse,
  RecruiterActivityQueryInput,
  CreateRecruiterActivityInput,
  UpdateRecruiterActivityInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterActivity)
export class RecruiterActivityResolver extends BaseResolver<
  CreateRecruiterActivityInput,
  UpdateRecruiterActivityInput,
  RecruiterActivityQueryInput
>({
  viewDto: RecruiterActivity,
  createInput: CreateRecruiterActivityInput,
  updateInput: UpdateRecruiterActivityInput,
  listQueryInput: RecruiterActivityQueryInput,
  listViewDto: RecruiterActivityListReponse,
  name: 'recruiterActivity',
  pluralName: 'recruiterActivities',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterActivityMessagePattern);
  }
}
