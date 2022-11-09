import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidateAttachInput,
  CandidateAttachDto,
  CandidateAttachListReponseDto,
  CandidateAttachMessagePattern,
  CandidateAttachQueryInput,
  UpdateCandidateAttachInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-attach')
export class CandidateAttachController extends BaseController<
  CandidateAttachDto,
  CreateCandidateAttachInput,
  UpdateCandidateAttachInput,
  CandidateAttachQueryInput,
  CandidateAttachListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidateAttachMessagePattern);
  }
}
