import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateInput,
  CandidateDto,
  CandidateListReponseDto,
  CandidateMessagePattern,
  CandidateQueryInput,
  UpdateCandidateInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate')
export class CandidateController extends BaseController<
  CandidateDto,
  CreateCandidateInput,
  UpdateCandidateInput,
  CandidateQueryInput,
  CandidateListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateMessagePattern);
  }
}
