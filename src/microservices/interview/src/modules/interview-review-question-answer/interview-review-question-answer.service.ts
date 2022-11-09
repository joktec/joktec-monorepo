import { Model } from 'mongoose';
import {
  InterviewReviewQuestionAnswer,
  InterviewReviewQuestionAnswerDocument,
} from './schemas/interview-review-question-answer.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewReviewQuestionAnswerService extends BaseService<InterviewReviewQuestionAnswerDocument> {
  constructor(
    @InjectModel(InterviewReviewQuestionAnswer.name)
    private interviewReviewQuestionAnswerModel: Model<InterviewReviewQuestionAnswerDocument>,
  ) {
    super(interviewReviewQuestionAnswerModel);
  }
}
