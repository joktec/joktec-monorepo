import {
  CandidatePerferenceHistoryMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidatePerferenceHistoryInput,
  UpdateCandidatePerferenceHistoryInput,
  CandidatePerferenceHistoryQueryInput,
  CandidatePerferenceHistoryListReponse,
  CandidatePerferenceHistory,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidatePerferenceHistory)
export class CandidatePerferenceHistoryResolver extends BaseResolver<
  CreateCandidatePerferenceHistoryInput,
  UpdateCandidatePerferenceHistoryInput,
  CandidatePerferenceHistoryQueryInput
>({
  viewDto: CandidatePerferenceHistory,
  createInput: CreateCandidatePerferenceHistoryInput,
  updateInput: UpdateCandidatePerferenceHistoryInput,
  listQueryInput: CandidatePerferenceHistoryQueryInput,
  listViewDto: CandidatePerferenceHistoryListReponse,
  name: 'candidatePerferenceHistory',
  pluralName: 'candidatePerferenceHistories',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidatePerferenceHistoryMessagePattern);
  }
}
