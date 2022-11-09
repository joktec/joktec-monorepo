import {
  CandidateFunctionMessagePattern,
  CandidateMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateCandidateFunctionInput,
  UpdateCandidateFunctionInput,
  CandidateFunctionQueryInput,
  CandidateFunctionListReponse,
  CandidateFunction,
} from '@jobhopin/graphql';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Resolver(() => CandidateFunction)
export class CandidateFunctionResolver extends BaseResolver<
  CreateCandidateFunctionInput,
  UpdateCandidateFunctionInput,
  CandidateFunctionQueryInput
>({
  viewDto: CandidateFunction,
  createInput: CreateCandidateFunctionInput,
  updateInput: UpdateCandidateFunctionInput,
  listQueryInput: CandidateFunctionQueryInput,
  listViewDto: CandidateFunctionListReponse,
  name: 'candidateFunction',
  pluralName: 'candidateFunctions',
}) {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFunctionMessagePattern);
  }
}
