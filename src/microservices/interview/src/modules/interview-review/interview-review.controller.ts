import { Controller } from '@nestjs/common';
import { InterviewReviewService } from './interview-review.service';
import {
  BaseMicroserviceController,
  InterviewReviewMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewReviewController extends BaseMicroserviceController(
  InterviewReviewMessagePattern,
) {
  constructor(private readonly interviewReviewService: InterviewReviewService) {
    super(interviewReviewService);
  }
}
