import {
  RecruiterFirstActivityDateMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterFirstActivityDate,
  RecruiterFirstActivityDateListReponse,
  RecruiterFirstActivityDateQueryInput,
  CreateRecruiterFirstActivityDateInput,
  UpdateRecruiterFirstActivityDateInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterFirstActivityDate)
export class RecruiterFirstActivityDateResolver extends BaseResolver<
  CreateRecruiterFirstActivityDateInput,
  UpdateRecruiterFirstActivityDateInput,
  RecruiterFirstActivityDateQueryInput
>({
  viewDto: RecruiterFirstActivityDate,
  createInput: CreateRecruiterFirstActivityDateInput,
  updateInput: UpdateRecruiterFirstActivityDateInput,
  listQueryInput: RecruiterFirstActivityDateQueryInput,
  listViewDto: RecruiterFirstActivityDateListReponse,
  name: 'recruiterFirstActivityDate',
  pluralName: 'recruiterFirstActivityDates',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterFirstActivityDateMessagePattern);
  }
}
