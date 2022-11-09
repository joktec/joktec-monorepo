import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobseekerRecommendationJobDto } from './dto/create-jobseeker_recommendation_job.dto';
import { UpdateJobseekerRecommendationJobDto } from './dto/update-jobseeker_recommendation_job.dto';
import { JobseekerRecommendationJobs, JobseekerRecommendationJobsDocument } from './schemas/jobseeker_recommendation_jobs.schema';

@Injectable()
export class JobseekerRecommendationJobsService extends BaseService<JobseekerRecommendationJobsDocument>{
  constructor(
    @InjectModel(JobseekerRecommendationJobs.name)
    private jobseekerRecommendationJobsModel: Model<JobseekerRecommendationJobsDocument>,
  ) {
    super(jobseekerRecommendationJobsModel);
  }
}
