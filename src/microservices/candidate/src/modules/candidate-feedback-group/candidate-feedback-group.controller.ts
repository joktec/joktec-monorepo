import {
  BaseMicroserviceController,
  CandidateFeedbackGroupMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CandidateFeedbackGroupService } from './candidate-feedback-group.service';

@Controller('candidate-feedback-group')
export class CandidateFeedbackGroupController extends BaseMicroserviceController(
  CandidateFeedbackGroupMessagePattern,
) {
  constructor(
    private readonly candidateFeedbackGroupService: CandidateFeedbackGroupService,
  ) {
    super(candidateFeedbackGroupService);
  }
}
