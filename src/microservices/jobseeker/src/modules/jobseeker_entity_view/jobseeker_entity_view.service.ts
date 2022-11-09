import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerEntityView, JobseekerEntityViewDocument } from './schemas/jobseeker_entity_view.schema';

@Injectable()
export class JobseekerEntityViewService extends BaseService<JobseekerEntityViewDocument>{
  constructor(
    @InjectModel(JobseekerEntityView.name)
    private jobseekerEntityViewModel: Model<JobseekerEntityViewDocument>,
  ) {
    super(jobseekerEntityViewModel);
  }
}
