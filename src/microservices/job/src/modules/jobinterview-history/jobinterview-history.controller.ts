import { Controller } from '@nestjs/common';
import { JobInterviewHistoryService } from './jobinterview-history.service';
import {
  BaseMicroserviceController,
  JobInterviewHistoryMessagePattern,
} from '@jobhopin/core';

@Controller('jobinterview-history')
export class JobInterviewHistoryController extends BaseMicroserviceController(
  JobInterviewHistoryMessagePattern,
) {
  constructor(
    private readonly jobInterviewHistoryService: JobInterviewHistoryService,
  ) {
    super(jobInterviewHistoryService);
  }
}
