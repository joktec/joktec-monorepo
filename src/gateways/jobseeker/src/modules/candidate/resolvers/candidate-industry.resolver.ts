import {
  CandidateIndustryMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateIndustryInput,
  UpdateCandidateIndustryInput,
  CandidateIndustryQueryInput,
  CandidateIndustryListReponse,
  CandidateIndustry,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateIndustry)
export class CandidateIndustryResolver extends BaseResolver<
  CreateCandidateIndustryInput,
  UpdateCandidateIndustryInput,
  CandidateIndustryQueryInput
>({
  viewDto: CandidateIndustry,
  createInput: CreateCandidateIndustryInput,
  updateInput: UpdateCandidateIndustryInput,
  listQueryInput: CandidateIndustryQueryInput,
  listViewDto: CandidateIndustryListReponse,
  name: 'candidateIndustry',
  pluralName: 'candidateIndustries',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateIndustryMessagePattern);
  }
}
