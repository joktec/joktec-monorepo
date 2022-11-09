import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Jobseeker, JobseekerDocument } from './schemas/jobseeker.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';
@Injectable()
export class JobseekerService extends BaseService<JobseekerDocument> {
  constructor(
    @InjectModel(Jobseeker.name)
    private jobseekerModel: Model<JobseekerDocument>,
  ) {
    super(jobseekerModel);
  }

  async findOneBy(query: any) {
    return await this.jobseekerModel.findOne(query).exec();
  }
}
