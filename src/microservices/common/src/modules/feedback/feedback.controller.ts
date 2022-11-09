import {
  BaseMicroserviceController,
  FeedbackMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedbacks')
export class FeedbackController extends BaseMicroserviceController(
  FeedbackMessagePattern,
) {
  constructor(private readonly feedbackService: FeedbackService) {
    super(feedbackService);
  }
}
