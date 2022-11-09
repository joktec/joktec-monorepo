import { Controller } from '@nestjs/common';
import { InterviewReviewCommentService } from './interview-review-comment.service';
import {
  BaseMicroserviceController,
  InterviewReviewCommentMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewReviewCommentController extends BaseMicroserviceController(
  InterviewReviewCommentMessagePattern,
) {
  constructor(
    private readonly interviewReviewCommentService: InterviewReviewCommentService,
  ) {
    super(interviewReviewCommentService);
  }
}
