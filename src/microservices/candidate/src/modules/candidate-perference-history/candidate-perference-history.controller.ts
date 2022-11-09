import { BaseMicroserviceController } from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidatePerferenceHistoryService } from './candidate-perference-history.service';
import { CandidatePerferenceHistoryMessagePattern } from '@jobhopin/core';

@Controller('candidate-perference-history')
export class CandidatePerferenceHistoryController extends BaseMicroserviceController(
  CandidatePerferenceHistoryMessagePattern,
) {
  constructor(
    private readonly candidatePerferenceHistoryService: CandidatePerferenceHistoryService,
  ) {
    super(candidatePerferenceHistoryService);
  }
}
