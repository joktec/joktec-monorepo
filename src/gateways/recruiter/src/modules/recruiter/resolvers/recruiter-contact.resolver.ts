import {
  RecruiterContactMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterContact,
  RecruiterContactListReponse,
  RecruiterContactQueryInput,
  CreateRecruiterContactInput,
  UpdateRecruiterContactInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterContact)
export class RecruiterContactResolver extends BaseResolver<
  CreateRecruiterContactInput,
  UpdateRecruiterContactInput,
  RecruiterContactQueryInput
>({
  viewDto: RecruiterContact,
  createInput: CreateRecruiterContactInput,
  updateInput: UpdateRecruiterContactInput,
  listQueryInput: RecruiterContactQueryInput,
  listViewDto: RecruiterContactListReponse,
  name: 'recruiterContact',
  pluralName: 'recruiterContacts',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterContactMessagePattern);
  }
}
