import {
  BaseMicroserviceController,
  CandidateFeedbackGroupContentMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateFeedbackGroupContentService } from './candidate-feedback-group-content.service';

@Controller('candidate-feedback-group-content')
export class CandidateFeedbackGroupContentController extends BaseMicroserviceController(
  CandidateFeedbackGroupContentMessagePattern,
) {
  constructor(
    private readonly candidateFeedbackGroupContentService: CandidateFeedbackGroupContentService,
  ) {
    super(candidateFeedbackGroupContentService);
  }
}
