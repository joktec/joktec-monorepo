import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateFunctionInput,
  CandidateFunctionDto,
  CandidateFunctionListReponseDto,
  CandidateFunctionMessagePattern,
  CandidateFunctionQueryInput,
  UpdateCandidateFunctionInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-function')
export class CandidateFunctionController extends BaseController<
  CandidateFunctionDto,
  CreateCandidateFunctionInput,
  UpdateCandidateFunctionInput,
  CandidateFunctionQueryInput,
  CandidateFunctionListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateFunctionMessagePattern);
  }
}
