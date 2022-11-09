import {
  BaseController,
  CandidateMicroserviceConfig,
  CreateCandidatePerferenceHistoryInput,
  CandidatePerferenceHistoryDto,
  CandidatePerferenceHistoryListReponseDto,
  CandidatePerferenceHistoryMessagePattern,
  CandidatePerferenceHistoryQueryInput,
  UpdateCandidatePerferenceHistoryInput,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const candidateMicroserviceConfig = new CandidateMicroserviceConfig();
@Controller('candidate-perference-history')
export class CandidatePerferenceHistoryController extends BaseController<
  CandidatePerferenceHistoryDto,
  CreateCandidatePerferenceHistoryInput,
  UpdateCandidatePerferenceHistoryInput,
  CandidatePerferenceHistoryQueryInput,
  CandidatePerferenceHistoryListReponseDto
> {
  constructor(
    @Inject(candidateMicroserviceConfig.name)
    private readonly candidateMicroservice: ClientProxy,
  ) {
    super(candidateMicroservice, CandidatePerferenceHistoryMessagePattern);
  }
}
