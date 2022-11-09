import { JobLike, JobLikeDocument } from './schemas/job-like.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobLikeService extends BaseService<JobLikeDocument> {
  constructor(
    @InjectModel(JobLike.name)
    private readonly mainModel: Model<JobLikeDocument>,
  ) {
    super(mainModel);
  }
}
