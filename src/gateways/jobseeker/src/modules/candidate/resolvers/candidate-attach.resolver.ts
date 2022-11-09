import {
  CandidateAttachMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateAttachInput,
  UpdateCandidateAttachInput,
  CandidateAttachQueryInput,
  CandidateAttachListReponse,
  CandidateAttach,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateAttach)
export class CandidateAttachResolver extends BaseResolver<
  CreateCandidateAttachInput,
  UpdateCandidateAttachInput,
  CandidateAttachQueryInput
>({
  viewDto: CandidateAttach,
  createInput: CreateCandidateAttachInput,
  updateInput: UpdateCandidateAttachInput,
  listQueryInput: CandidateAttachQueryInput,
  listViewDto: CandidateAttachListReponse,
  name: 'candidateAttach',
  pluralName: 'candidateAttachs',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateAttachMessagePattern);
  }
}
