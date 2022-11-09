import {
  CandidateCompanyTypeMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateCompanyTypeInput,
  UpdateCandidateCompanyTypeInput,
  CandidateCompanyTypeQueryInput,
  CandidateCompanyTypeListReponse,
  CandidateCompanyType,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateCompanyType)
export class CandidateCompanyTypeResolver extends BaseResolver<
  CreateCandidateCompanyTypeInput,
  UpdateCandidateCompanyTypeInput,
  CandidateCompanyTypeQueryInput
>({
  viewDto: CandidateCompanyType,
  createInput: CreateCandidateCompanyTypeInput,
  updateInput: UpdateCandidateCompanyTypeInput,
  listQueryInput: CandidateCompanyTypeQueryInput,
  listViewDto: CandidateCompanyTypeListReponse,
  name: 'candidateCompanyType',
  pluralName: 'candidateCompanyTypes',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateCompanyTypeMessagePattern);
  }
}
