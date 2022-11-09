import { Controller } from '@nestjs/common';
import { JobSearchQuotaService } from './job-search-quota.service';
import {
  BaseMicroserviceController,
  JobSearchQuotaMessagePattern,
} from '@jobhopin/core';

@Controller('job-elastic-quota')
export class JobSearchQuotaController extends BaseMicroserviceController(
  JobSearchQuotaMessagePattern,
) {
  constructor(private readonly jobSearchQuotaService: JobSearchQuotaService) {
    super(jobSearchQuotaService);
  }
}
