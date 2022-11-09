import { Model } from 'mongoose';
import {
  InterviewReviewCommentMention,
  InterviewReviewCommentMentionDocument,
} from './schemas/interview-review-comment-mention.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewReviewCommentMentionService extends BaseService<InterviewReviewCommentMentionDocument> {
  constructor(
    @InjectModel(InterviewReviewCommentMention.name)
    private interviewReviewCommentMentionModel: Model<InterviewReviewCommentMentionDocument>,
  ) {
    super(interviewReviewCommentMentionModel);
  }
}
