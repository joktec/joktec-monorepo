import {
  CandidateLinkMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateLinkInput,
  UpdateCandidateLinkInput,
  CandidateLinkQueryInput,
  CandidateLinkListReponse,
  CandidateLink,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateLink)
export class CandidateLinkResolver extends BaseResolver<
  CreateCandidateLinkInput,
  UpdateCandidateLinkInput,
  CandidateLinkQueryInput
>({
  viewDto: CandidateLink,
  createInput: CreateCandidateLinkInput,
  updateInput: UpdateCandidateLinkInput,
  listQueryInput: CandidateLinkQueryInput,
  listViewDto: CandidateLinkListReponse,
  name: 'candidateLink',
  pluralName: 'candidateLinks',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateLinkMessagePattern);
  }
}
