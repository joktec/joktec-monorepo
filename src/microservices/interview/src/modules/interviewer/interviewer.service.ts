import { Model } from 'mongoose';
import { Interviewer, InterviewerDocument } from './schemas/interviewer.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class InterviewerService extends BaseService<InterviewerDocument> {
  constructor(
    @InjectModel(Interviewer.name)
    private interviewerModel: Model<InterviewerDocument>,
  ) {
    super(interviewerModel);
  }
}
