import { Model } from 'mongoose';
import {
  InterviewFeedback,
  InterviewFeedbackDocument,
} from './schemas/interview-feedback.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewFeedbackService extends BaseService<InterviewFeedbackDocument> {
  constructor(
    @InjectModel(InterviewFeedback.name)
    private interviewFeedbackModel: Model<InterviewFeedbackDocument>,
  ) {
    super(interviewFeedbackModel);
  }
}
