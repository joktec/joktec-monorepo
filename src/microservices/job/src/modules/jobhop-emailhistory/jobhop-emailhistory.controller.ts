import {
  BaseMicroserviceController,
  JobhopEmailHistoryMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { JobhopEmailHistoryService } from './jobhop-emailhistory.service';

@Controller('jobhop-emailhistory')
export class JobhopEmailHistoryController extends BaseMicroserviceController(
  JobhopEmailHistoryMessagePattern,
) {
  constructor(
    private readonly jobhopEmailHistoryService: JobhopEmailHistoryService,
  ) {
    super(jobhopEmailHistoryService);
  }
}
