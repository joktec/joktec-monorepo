import { Controller } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import {
  BaseMicroserviceController,
  InterviewerMessagePattern,
} from '@jobhopin/core';

@Controller()
export class InterviewerController extends BaseMicroserviceController(
  InterviewerMessagePattern,
) {
  constructor(private readonly interviewerService: InterviewerService) {
    super(interviewerService);
  }
}
