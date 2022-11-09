import { Controller } from '@nestjs/common';
import { RecruiterPaymentService } from './recruiter-payment.service';
import {
  BaseMicroserviceController,
  RecruiterPaymentMessagePattern,
} from '@jobhopin/core';

@Controller('recruiter-payment')
export class RecruiterPaymentController extends BaseMicroserviceController(
  RecruiterPaymentMessagePattern,
) {
  constructor(
    private readonly recruiterPaymentService: RecruiterPaymentService,
  ) {
    super(recruiterPaymentService);
  }
}
