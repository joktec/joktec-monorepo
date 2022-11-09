import {
  JobhopPaymentLink,
  JobhopPaymentLinkDocument,
} from './schemas/jobhop-paymentlink.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopPaymentLinkService extends BaseService<JobhopPaymentLinkDocument> {
  constructor(
    @InjectModel(JobhopPaymentLink.name)
    private readonly mainModel: Model<JobhopPaymentLinkDocument>,
  ) {
    super(mainModel);
  }
}
