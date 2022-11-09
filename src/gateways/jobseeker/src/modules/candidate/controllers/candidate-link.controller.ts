import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateLinkInput,
  CandidateLinkDto,
  CandidateLinkListReponseDto,
  CandidateLinkMessagePattern,
  CandidateLinkQueryInput,
  UpdateCandidateLinkInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-link')
export class CandidateLinkController extends BaseController<
  CandidateLinkDto,
  CreateCandidateLinkInput,
  UpdateCandidateLinkInput,
  CandidateLinkQueryInput,
  CandidateLinkListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateLinkMessagePattern);
  }
}
