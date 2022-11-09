import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
import { BaseService } from '@jobhopin/core';

export class FeedbackService extends BaseService<FeedbackDocument> {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {
    super(feedbackModel);
  }
}
