import { Model } from 'mongoose';
import { CvFeedback, CvFeedbackDocument } from './schemas/cv-feedback.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvFeedbackService extends BaseService<CvFeedbackDocument> {
  constructor(
    @InjectModel(CvFeedback.name)
    private cvModel: Model<CvFeedbackDocument>,
  ) {
    super(cvModel);
  }
}
