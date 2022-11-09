import { Controller } from '@nestjs/common';
import { JobhopGenericDomainService } from './jobhop-genericdomain.service';
import {
  BaseMicroserviceController,
  JobhopGenericDomainMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-genericdomain')
export class JobhopGenericDomainController extends BaseMicroserviceController(
  JobhopGenericDomainMessagePattern,
) {
  constructor(
    private readonly jobhopGenericDomainService: JobhopGenericDomainService,
  ) {
    super(jobhopGenericDomainService);
  }
}
