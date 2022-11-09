import { Model } from 'mongoose';
import {
  InterviewReviewComment,
  InterviewReviewCommentDocument,
} from './schemas/interview-review-comment.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewReviewCommentService extends BaseService<InterviewReviewCommentDocument> {
  constructor(
    @InjectModel(InterviewReviewComment.name)
    private interviewReviewCommentModel: Model<InterviewReviewCommentDocument>,
  ) {
    super(interviewReviewCommentModel);
  }
}
