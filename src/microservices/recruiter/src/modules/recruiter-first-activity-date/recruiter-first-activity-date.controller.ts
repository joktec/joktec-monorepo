import { Controller } from '@nestjs/common';
import { RecruiterFirstActivityDateService } from './recruiter-first-activity-date.service';
import {
  BaseMicroserviceController,
  RecruiterFirstActivityDateMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-first-activity-date')
export class RecruiterFirstActivityDateController extends BaseMicroserviceController(
  RecruiterFirstActivityDateMessagePattern,
) {
  constructor(
    private readonly recruiterFirstActivityDateService: RecruiterFirstActivityDateService,
  ) {
    super(recruiterFirstActivityDateService);
  }
}
