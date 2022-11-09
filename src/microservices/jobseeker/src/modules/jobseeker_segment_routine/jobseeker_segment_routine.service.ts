import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerSegmentRoutine, JobseekerSegmentRoutineDocument } from './schemas/jobseeker_segment_routine.schema';

@Injectable()
export class JobseekerSegmentRoutineService extends BaseService<JobseekerSegmentRoutineDocument>{
  constructor(
    @InjectModel(JobseekerSegmentRoutine.name)
    private jobseekerSegmentRoutineModel: Model<JobseekerSegmentRoutineDocument>,
  ) {
    super(jobseekerSegmentRoutineModel);
  }
}
