import {
  CandidateLocationMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateLocationInput,
  UpdateCandidateLocationInput,
  CandidateLocationQueryInput,
  CandidateLocationListReponse,
  CandidateLocation,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateLocation)
export class CandidateLocationResolver extends BaseResolver<
  CreateCandidateLocationInput,
  UpdateCandidateLocationInput,
  CandidateLocationQueryInput
>({
  viewDto: CandidateLocation,
  createInput: CreateCandidateLocationInput,
  updateInput: UpdateCandidateLocationInput,
  listQueryInput: CandidateLocationQueryInput,
  listViewDto: CandidateLocationListReponse,
  name: 'candidateLocation',
  pluralName: 'candidateLocations',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateLocationMessagePattern);
  }
}
