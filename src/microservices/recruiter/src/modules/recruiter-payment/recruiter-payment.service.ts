import {
  BaseService,
  RecruiterPaymentConditionInput,
  RecruiterPaymentPaginationInput,
} from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RecruiterPayment,
  RecruiterPaymentDocument,
} from './schemas/recruiter-payment.schema';

@Injectable()
export class RecruiterPaymentService extends BaseService<
  RecruiterPaymentDocument,
  RecruiterPaymentConditionInput,
  RecruiterPaymentPaginationInput
> {
  constructor(
    @InjectModel(RecruiterPayment.name)
    private recruiterPaymentModel: Model<RecruiterPaymentDocument>,
  ) {
    super(recruiterPaymentModel);
  }
}
