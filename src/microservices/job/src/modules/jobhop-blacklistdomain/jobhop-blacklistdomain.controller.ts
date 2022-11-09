import { Controller } from '@nestjs/common';
import { JobhopBlacklistDomainService } from './jobhop-blacklistdomain.service';
import {
  BaseMicroserviceController,
  JobhopBlacklistDomainMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-blacklistdomain')
export class JobhopBlacklistDomainController extends BaseMicroserviceController(
  JobhopBlacklistDomainMessagePattern,
) {
  constructor(
    private readonly jobhopBlacklistDomainService: JobhopBlacklistDomainService,
  ) {
    super(jobhopBlacklistDomainService);
  }
}
