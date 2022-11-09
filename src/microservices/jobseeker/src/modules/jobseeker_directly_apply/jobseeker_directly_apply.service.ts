import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobseekerDirectlyApplyDto } from './dto/create-jobseeker_directly_apply.dto';
import { UpdateJobseekerDirectlyApplyDto } from './dto/update-jobseeker_directly_apply.dto';
import { JobseekerDirectlyApply, JobseekerDirectlyApplyDocument } from './schemas/jobseeker_directly_apply.schema';

@Injectable()
export class JobseekerDirectlyApplyService extends BaseService<JobseekerDirectlyApplyDocument>{
  constructor(
    @InjectModel(JobseekerDirectlyApply.name)
    private jobseekerDirectlyApplyModel: Model<JobseekerDirectlyApplyDocument>,
  ) {
    super(jobseekerDirectlyApplyModel);
  }
}
