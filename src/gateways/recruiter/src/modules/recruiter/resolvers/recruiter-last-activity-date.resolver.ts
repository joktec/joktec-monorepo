import {
  RecruiterLastActivityDateMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterLastActivityDate,
  RecruiterLastActivityDateListReponse,
  RecruiterLastActivityDateQueryInput,
  CreateRecruiterLastActivityDateInput,
  UpdateRecruiterLastActivityDateInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterLastActivityDate)
export class RecruiterLastActivityDateResolver extends BaseResolver<
  CreateRecruiterLastActivityDateInput,
  UpdateRecruiterLastActivityDateInput,
  RecruiterLastActivityDateQueryInput
>({
  viewDto: RecruiterLastActivityDate,
  createInput: CreateRecruiterLastActivityDateInput,
  updateInput: UpdateRecruiterLastActivityDateInput,
  listQueryInput: RecruiterLastActivityDateQueryInput,
  listViewDto: RecruiterLastActivityDateListReponse,
  name: 'recruiterLastActivityDate',
  pluralName: 'recruiterLastActivityDates',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterLastActivityDateMessagePattern);
  }
}
