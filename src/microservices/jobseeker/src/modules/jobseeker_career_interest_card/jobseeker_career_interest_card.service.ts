import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerCareerInterestCard, JobseekerCareerInterestCardDocument } from './schemas/jobseeker_career_interest_card.schema';

@Injectable()
export class JobseekerCareerInterestCardService extends BaseService<JobseekerCareerInterestCardDocument>{
  constructor(
    @InjectModel(JobseekerCareerInterestCard.name)
    private jobseekerCareerInterestCardModel: Model<JobseekerCareerInterestCardDocument>,
  ) {
    super(jobseekerCareerInterestCardModel);
  }
}
