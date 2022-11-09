import { Controller } from '@nestjs/common';
import { InterviewReviewQuestionAnswerService } from './interview-review-question-answer.service';
import {
  BaseMicroserviceController,
  InterviewReviewQuestionAnswerMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewReviewQuestionAnswerController extends BaseMicroserviceController(
  InterviewReviewQuestionAnswerMessagePattern,
) {
  constructor(
    private readonly interviewReviewQuestionAnswerService: InterviewReviewQuestionAnswerService,
  ) {
    super(interviewReviewQuestionAnswerService);
  }
}
