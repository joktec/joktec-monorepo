import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerCrawler, JobseekerCrawlerDocument } from './schemas/jobseeker_crawler.schema';

@Injectable()
export class JobseekerCrawlerService extends BaseService<JobseekerCrawlerDocument>{
  constructor(
    @InjectModel(JobseekerCrawler.name)
    private jobseekerCrawleModel: Model<JobseekerCrawlerDocument>,
  ) {
    super(jobseekerCrawleModel);
  }
}
