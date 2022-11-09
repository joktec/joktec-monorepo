import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerSkill, JobseekerSkillDocument } from './schemas/jobseeker_skill.schema';

@Injectable()
export class JobseekerSkillService extends BaseService<JobseekerSkillDocument>{
  constructor(
    @InjectModel(JobseekerSkill.name)
    private jobseekerSkillModel: Model<JobseekerSkillDocument>,
  ) {
    super(jobseekerSkillModel);
  }
}
