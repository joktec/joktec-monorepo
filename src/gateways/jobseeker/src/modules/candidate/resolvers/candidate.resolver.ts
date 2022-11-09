import {
  CandidateMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateInput,
  UpdateCandidateInput,
  CandidateQueryInput,
  CandidateListReponse,
  Candidate,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => Candidate)
export class CandidateResolver extends BaseResolver<
  CreateCandidateInput,
  UpdateCandidateInput,
  CandidateQueryInput
>({
  viewDto: Candidate,
  createInput: CreateCandidateInput,
  updateInput: UpdateCandidateInput,
  listQueryInput: CandidateQueryInput,
  listViewDto: CandidateListReponse,
  name: 'candidate',
  pluralName: 'candidates',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateMessagePattern);
  }
}
