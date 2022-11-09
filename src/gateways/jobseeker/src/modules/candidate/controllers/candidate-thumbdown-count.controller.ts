import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateThumbdownCountInput,
  CandidateThumbdownCountDto,
  CandidateThumbdownCountListReponseDto,
  CandidateThumbdownCountMessagePattern,
  CandidateThumbdownCountQueryInput,
  UpdateCandidateThumbdownCountInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-thumbdown-count')
export class CandidateThumbdownCountController extends BaseController<
  CandidateThumbdownCountDto,
  CreateCandidateThumbdownCountInput,
  UpdateCandidateThumbdownCountInput,
  CandidateThumbdownCountQueryInput,
  CandidateThumbdownCountListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateThumbdownCountMessagePattern);
  }
}
