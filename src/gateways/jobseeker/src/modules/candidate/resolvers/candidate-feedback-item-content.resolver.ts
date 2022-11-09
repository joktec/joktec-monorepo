import {
  CandidateFeedbackItemContentMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateFeedbackItemContentInput,
  UpdateCandidateFeedbackItemContentInput,
  CandidateFeedbackItemContentQueryInput,
  CandidateFeedbackItemContentListReponse,
  CandidateFeedbackItemContent,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateFeedbackItemContent)
export class CandidateFeedbackItemContentResolver extends BaseResolver<
  CreateCandidateFeedbackItemContentInput,
  UpdateCandidateFeedbackItemContentInput,
  CandidateFeedbackItemContentQueryInput
>({
  viewDto: CandidateFeedbackItemContent,
  createInput: CreateCandidateFeedbackItemContentInput,
  updateInput: UpdateCandidateFeedbackItemContentInput,
  listQueryInput: CandidateFeedbackItemContentQueryInput,
  listViewDto: CandidateFeedbackItemContentListReponse,
  name: 'candidateFeedbackItemContent',
  pluralName: 'candidateFeedbackItemContents',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackItemContentMessagePattern);
  }
}
