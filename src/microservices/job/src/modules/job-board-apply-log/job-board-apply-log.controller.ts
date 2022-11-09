import { Controller } from '@nestjs/common';
import { JobBoardApplyLogService } from './job-board-apply-log.service';
import {
  BaseMicroserviceController,
  JobBoardApplyLogMessagePattern,
} from '@jobhopin/core';

@Controller('job-board-apply-log')
export class JobBoardApplyLogController extends BaseMicroserviceController(
  JobBoardApplyLogMessagePattern,
) {
  constructor(
    private readonly jobBoardApplyLogService: JobBoardApplyLogService,
  ) {
    super(jobBoardApplyLogService);
  }
}
