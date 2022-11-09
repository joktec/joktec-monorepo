import {
  BaseMicroserviceController,
  CandidateFeedbackItemMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateFeedbackItemService } from './candidate-feedback-item.service';

@Controller('candidate-feedback-item')
export class CandidateFeedbackItemController extends BaseMicroserviceController(
  CandidateFeedbackItemMessagePattern,
) {
  constructor(
    private readonly candidateFeedbackItemService: CandidateFeedbackItemService,
  ) {
    super(candidateFeedbackItemService);
  }
}
