import {
  CandidateFeedbackGroupContentMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateFeedbackGroupContentInput,
  UpdateCandidateFeedbackGroupContentInput,
  CandidateFeedbackGroupContentQueryInput,
  CandidateFeedbackGroupContentListReponse,
  CandidateFeedbackGroupContent,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateFeedbackGroupContent)
export class CandidateFeedbackGroupContentResolver extends BaseResolver<
  CreateCandidateFeedbackGroupContentInput,
  UpdateCandidateFeedbackGroupContentInput,
  CandidateFeedbackGroupContentQueryInput
>({
  viewDto: CandidateFeedbackGroupContent,
  createInput: CreateCandidateFeedbackGroupContentInput,
  updateInput: UpdateCandidateFeedbackGroupContentInput,
  listQueryInput: CandidateFeedbackGroupContentQueryInput,
  listViewDto: CandidateFeedbackGroupContentListReponse,
  name: 'candidateFeedbackGroupContent',
  pluralName: 'candidateFeedbackGroupContents',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackGroupContentMessagePattern);
  }
}
