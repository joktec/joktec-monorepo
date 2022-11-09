import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateLocationInput,
  CandidateLocationDto,
  CandidateLocationListReponseDto,
  CandidateLocationMessagePattern,
  CandidateLocationQueryInput,
  UpdateCandidateLocationInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-location')
export class CandidateLocationController extends BaseController<
  CandidateLocationDto,
  CreateCandidateLocationInput,
  UpdateCandidateLocationInput,
  CandidateLocationQueryInput,
  CandidateLocationListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateLocationMessagePattern);
  }
}
