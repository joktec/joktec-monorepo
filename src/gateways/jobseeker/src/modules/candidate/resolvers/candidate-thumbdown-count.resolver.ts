import {
  CandidateThumbdownCountMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateThumbdownCountInput,
  UpdateCandidateThumbdownCountInput,
  CandidateThumbdownCountQueryInput,
  CandidateThumbdownCountListReponse,
  CandidateThumbdownCount,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateThumbdownCount)
export class CandidateThumbdownCountResolver extends BaseResolver<
  CreateCandidateThumbdownCountInput,
  UpdateCandidateThumbdownCountInput,
  CandidateThumbdownCountQueryInput
>({
  viewDto: CandidateThumbdownCount,
  createInput: CreateCandidateThumbdownCountInput,
  updateInput: UpdateCandidateThumbdownCountInput,
  listQueryInput: CandidateThumbdownCountQueryInput,
  listViewDto: CandidateThumbdownCountListReponse,
  name: 'candidateThumbdownCount',
  pluralName: 'candidateThumbdownCounts',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateThumbdownCountMessagePattern);
  }
}
