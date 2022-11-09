import {
  BaseMicroserviceController,
  CvFeedbackMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvFeedbackService } from './cv-feedback.service';

@Controller('cv-feedback')
export class CvFeedbackController extends BaseMicroserviceController(
  CvFeedbackMessagePattern,
) {
  constructor(private readonly cvService: CvFeedbackService) {
    super(cvService);
  }
}
