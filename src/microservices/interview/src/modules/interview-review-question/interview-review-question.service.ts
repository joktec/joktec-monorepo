import { Model } from 'mongoose';
import {
  InterviewReviewQuestion,
  InterviewReviewQuestionDocument,
} from './schemas/interview-review-question.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewReviewQuestionService extends BaseService<InterviewReviewQuestionDocument> {
  constructor(
    @InjectModel(InterviewReviewQuestion.name)
    private interviewReviewQuestionModel: Model<InterviewReviewQuestionDocument>,
  ) {
    super(interviewReviewQuestionModel);
  }
}
