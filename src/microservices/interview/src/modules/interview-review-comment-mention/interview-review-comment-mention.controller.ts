import { Controller } from '@nestjs/common';
import { InterviewReviewCommentMentionService } from './interview-review-comment-mention.service';
import {
  BaseMicroserviceController,
  InterviewReviewCommentMentionMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewReviewCommentMentionController extends BaseMicroserviceController(
  InterviewReviewCommentMentionMessagePattern,
) {
  constructor(
    private readonly interviewReviewCommentMentionService: InterviewReviewCommentMentionService,
  ) {
    super(interviewReviewCommentMentionService);
  }
}
