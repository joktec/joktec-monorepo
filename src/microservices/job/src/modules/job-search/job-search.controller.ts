import { Controller } from '@nestjs/common';
import { JobSearchService } from './job-search.service';
import {
  BaseMicroserviceController,
  JobSearchMessagePattern,
} from '@jobhopin/core';

@Controller('job-elastic')
export class JobSearchController extends BaseMicroserviceController(
  JobSearchMessagePattern,
) {
  constructor(private readonly jobSearchService: JobSearchService) {
    super(jobSearchService);
  }
}
