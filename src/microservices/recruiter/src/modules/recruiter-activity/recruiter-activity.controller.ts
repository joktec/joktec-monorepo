import { Controller } from '@nestjs/common';
import { RecruiterActivityService } from './recruiter-activity.service';
import {
  BaseMicroserviceController,
  RecruiterActivityMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-activity')
export class RecruiterActivityController extends BaseMicroserviceController(
  RecruiterActivityMessagePattern,
) {
  constructor(
    private readonly recruiterActivityService: RecruiterActivityService,
  ) {
    super(recruiterActivityService);
  }
}
