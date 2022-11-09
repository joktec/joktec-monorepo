import { Model } from 'mongoose';
import { Interview, InterviewDocument } from './schemas/interview.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewService extends BaseService<InterviewDocument> {
  constructor(
    @InjectModel(Interview.name)
    private interviewModel: Model<InterviewDocument>,
  ) {
    super(interviewModel);
  }
}
