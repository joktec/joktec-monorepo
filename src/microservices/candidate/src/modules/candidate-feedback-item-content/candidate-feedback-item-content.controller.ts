import { Controller } from '@nestjs/common';
import { CandidateFeedbackItemContentService } from './candidate-feedback-item-content.service';
import {
  BaseMicroserviceController,
  CandidateFeedbackItemContentMessagePattern,
} from '@jobhopin/core';

@Controller('candidate-feedback-item-content')
export class CandidateFeedbackItemContentController extends BaseMicroserviceController(
  CandidateFeedbackItemContentMessagePattern,
) {
  constructor(
    private readonly candidateFeedbackItemContentService: CandidateFeedbackItemContentService,
  ) {
    super(candidateFeedbackItemContentService);
  }
}
