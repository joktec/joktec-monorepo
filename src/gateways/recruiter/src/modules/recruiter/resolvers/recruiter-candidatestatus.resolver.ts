import {
  RecruiterCandidatestatusMessagePattern,
  RecruiterMicroserviceConfig,
} from '@jobhopin/core';
import {
  BaseResolver,
  RecruiterCandidatestatus,
  RecruiterCandidatestatusListReponse,
  RecruiterCandidatestatusQueryInput,
  CreateRecruiterCandidatestatusInput,
  UpdateRecruiterCandidatestatusInput,
} from '@jobhopin/graphql';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();

@Resolver(() => RecruiterCandidatestatus)
export class RecruiterCandidatestatusResolver extends BaseResolver<
  CreateRecruiterCandidatestatusInput,
  UpdateRecruiterCandidatestatusInput,
  RecruiterCandidatestatusQueryInput
>({
  viewDto: RecruiterCandidatestatus,
  createInput: CreateRecruiterCandidatestatusInput,
  updateInput: UpdateRecruiterCandidatestatusInput,
  listQueryInput: RecruiterCandidatestatusQueryInput,
  listViewDto: RecruiterCandidatestatusListReponse,
  name: 'recruiterCandidatestatus',
  pluralName: 'recruiterCandidatestatuses',
}) {
  constructor(
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
  ) {
    super(recruiterMicroservice, RecruiterCandidatestatusMessagePattern);
  }
}
