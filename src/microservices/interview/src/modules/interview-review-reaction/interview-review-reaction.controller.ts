import { Controller } from '@nestjs/common';
import { InterviewReviewReactionService } from './interview-review-reaction.service';
import {
  BaseMicroserviceController,
  InterviewReviewMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewReviewReactionController extends BaseMicroserviceController(
  InterviewReviewMessagePattern,
) {
  constructor(
    private readonly interviewReviewReactionService: InterviewReviewReactionService,
  ) {
    super(interviewReviewReactionService);
  }
}
