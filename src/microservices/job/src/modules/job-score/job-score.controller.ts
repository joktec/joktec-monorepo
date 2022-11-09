import { Controller } from '@nestjs/common';
import { JobScoreService } from './job-score.service';
import {
  BaseMicroserviceController,
  JobScoreMessagePattern,
} from '@jobhopin/core';

@Controller('job-score')
export class JobScoreController extends BaseMicroserviceController(
  JobScoreMessagePattern,
) {
  constructor(private readonly jobScoreService: JobScoreService) {
    super(jobScoreService);
  }
}
