import {
  RecruiterCandidatestatusmessageMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterCandidatestatusmessage,
  RecruiterCandidatestatusmessageListReponse,
  RecruiterCandidatestatusmessageQueryInput,
  CreateRecruiterCandidatestatusmessageInput,
  UpdateRecruiterCandidatestatusmessageInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterCandidatestatusmessage)
export class RecruiterCandidatestatusmessageResolver extends BaseResolver<
  CreateRecruiterCandidatestatusmessageInput,
  UpdateRecruiterCandidatestatusmessageInput,
  RecruiterCandidatestatusmessageQueryInput
>({
  viewDto: RecruiterCandidatestatusmessage,
  createInput: CreateRecruiterCandidatestatusmessageInput,
  updateInput: UpdateRecruiterCandidatestatusmessageInput,
  listQueryInput: RecruiterCandidatestatusmessageQueryInput,
  listViewDto: RecruiterCandidatestatusmessageListReponse,
  name: 'recruiterCandidatestatusmessage',
  pluralName: 'recruiterCandidatestatusmessages',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterCandidatestatusmessageMessagePattern);
  }
}
