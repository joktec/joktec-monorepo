import { Controller } from '@nestjs/common';
import { JobhopOrganizationBenefitService } from './jobhop-organizationbenefit.service';
import {
  BaseMicroserviceController,
  JobhopOrganizationBenefitMessagePattern,
} from '@jobhopin/core';

@Controller('jobhop-organizationbenefit')
export class JobhopOrganizationBenefitController extends BaseMicroserviceController(
  JobhopOrganizationBenefitMessagePattern,
) {
  constructor(
    private readonly jobhopOrganizationBenefitService: JobhopOrganizationBenefitService,
  ) {
    super(jobhopOrganizationBenefitService);
  }
}
