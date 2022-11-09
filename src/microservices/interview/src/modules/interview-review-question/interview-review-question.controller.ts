import { Controller } from '@nestjs/common';
import { InterviewReviewQuestionService } from './interview-review-question.service';
import {
  BaseMicroserviceController,
  InterviewReviewQuestionMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewReviewQuestionController extends BaseMicroserviceController(
  InterviewReviewQuestionMessagePattern,
) {
  constructor(
    private readonly interviewReviewQuestionService: InterviewReviewQuestionService,
  ) {
    super(interviewReviewQuestionService);
  }
}
