import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobseekerMatchscoreDto } from './dto/create-jobseeker_matchscore.dto';
import { UpdateJobseekerMatchscoreDto } from './dto/update-jobseeker_matchscore.dto';
import { JobseekerMatchscore, JobseekerMatchscoreDocument } from './schemas/jobseeker_matchscore.schema';

@Injectable()
export class JobseekerMatchscoreService extends BaseService<JobseekerMatchscoreDocument>{
  constructor(
    @InjectModel(JobseekerMatchscore.name)
    private jobseekerMatchscoreModel: Model<JobseekerMatchscoreDocument>,
  ) {
    super(jobseekerMatchscoreModel);
  }
}
