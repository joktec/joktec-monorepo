import {
  BaseMicroserviceController,
  JobAiLysisMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { JobAiLysisService } from './job-ai-lysis.service';

@Controller('job-ai-lysis')
export class JobAiLysisController extends BaseMicroserviceController(
  JobAiLysisMessagePattern,
) {
  constructor(private readonly jobAiLysisService: JobAiLysisService) {
    super(jobAiLysisService);
  }
}
