import { Controller } from '@nestjs/common';
import { JobMatchService } from './jobmatch.service';
import {
  BaseMicroserviceController,
  JobMatchMessagePattern,
} from '@jobhopin/core';

@Controller('jobmatch')
export class JobMatchController extends BaseMicroserviceController(
  JobMatchMessagePattern,
) {
  constructor(private readonly jobMatchService: JobMatchService) {
    super(jobMatchService);
  }
}
