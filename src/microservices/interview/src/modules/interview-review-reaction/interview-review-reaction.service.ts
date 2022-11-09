import { Model } from 'mongoose';
import {
  InterviewReviewReaction,
  InterviewReviewReactionDocument,
} from './schemas/interview-review-reaction.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewReviewReactionService extends BaseService<InterviewReviewReactionDocument> {
  constructor(
    @InjectModel(InterviewReviewReaction.name)
    private interviewReviewReactionModel: Model<InterviewReviewReactionDocument>,
  ) {
    super(interviewReviewReactionModel);
  }
}
