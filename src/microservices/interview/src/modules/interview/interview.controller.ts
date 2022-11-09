import { Controller } from '@nestjs/common';
import { InterviewService } from './interview.service';
import {
  BaseMicroserviceController,
  InterviewMessagePattern,
} from '@jobhopin/core';

@Controller('interview')
export class InterviewController extends BaseMicroserviceController(
  InterviewMessagePattern,
) {
  constructor(private readonly interviewService: InterviewService) {
    super(interviewService);
  }
}
