import {
  CandidateFeedbackItemMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateFeedbackItemInput,
  UpdateCandidateFeedbackItemInput,
  CandidateFeedbackItemQueryInput,
  CandidateFeedbackItemListReponse,
  CandidateFeedbackItem,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateFeedbackItem)
export class CandidateFeedbackItemResolver extends BaseResolver<
  CreateCandidateFeedbackItemInput,
  UpdateCandidateFeedbackItemInput,
  CandidateFeedbackItemQueryInput
>({
  viewDto: CandidateFeedbackItem,
  createInput: CreateCandidateFeedbackItemInput,
  updateInput: UpdateCandidateFeedbackItemInput,
  listQueryInput: CandidateFeedbackItemQueryInput,
  listViewDto: CandidateFeedbackItemListReponse,
  name: 'candidateFeedbackItem',
  pluralName: 'candidateFeedbackItems',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackItemMessagePattern);
  }
}
