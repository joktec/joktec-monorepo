import { Controller } from '@nestjs/common';
import { InterviewFeedbackService } from './interview-feedback.service';
import {
  BaseMicroserviceController,
  InterviewFeedbackMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewFeedbackController extends BaseMicroserviceController(
  InterviewFeedbackMessagePattern,
) {
  constructor(
    private readonly interviewFeedbackService: InterviewFeedbackService,
  ) {
    super(interviewFeedbackService);
  }
}
