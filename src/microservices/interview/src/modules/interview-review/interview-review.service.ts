import { Model } from 'mongoose';
import {
  InterviewReview,
  InterviewReviewDocument,
} from './schemas/interview-review.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewReviewService extends BaseService<InterviewReviewDocument> {
  constructor(
    @InjectModel(InterviewReview.name)
    private interviewReviewModel: Model<InterviewReviewDocument>,
  ) {
    super(interviewReviewModel);
  }
}
