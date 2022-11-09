import {
  CandidateFeedbackGroupMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateFeedbackGroupInput,
  UpdateCandidateFeedbackGroupInput,
  CandidateFeedbackGroupQueryInput,
  CandidateFeedbackGroupListReponse,
  CandidateFeedbackGroup,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateFeedbackGroup)
export class CandidateFeedbackGroupResolver extends BaseResolver<
  CreateCandidateFeedbackGroupInput,
  UpdateCandidateFeedbackGroupInput,
  CandidateFeedbackGroupQueryInput
>({
  viewDto: CandidateFeedbackGroup,
  createInput: CreateCandidateFeedbackGroupInput,
  updateInput: UpdateCandidateFeedbackGroupInput,
  listQueryInput: CandidateFeedbackGroupQueryInput,
  listViewDto: CandidateFeedbackGroupListReponse,
  name: 'candidateFeedbackGroup',
  pluralName: 'candidateFeedbackGroups',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFeedbackGroupMessagePattern);
  }
}
