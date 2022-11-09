import {
  BaseMicroserviceController,
  BenefitMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { BenefitService } from './benefit.service';

@Controller('benefits')
export class BenefitController extends BaseMicroserviceController(
  BenefitMessagePattern,
) {
  constructor(private readonly benefitService: BenefitService) {
    super(benefitService);
  }
}
