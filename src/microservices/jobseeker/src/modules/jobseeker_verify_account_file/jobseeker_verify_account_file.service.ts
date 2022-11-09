import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerVerifyAccountFile, JobseekerVerifyAccountFileDocument } from './schemas/jobseeker_verify_account_file.schema';

@Injectable()
export class JobseekerVerifyAccountFileService extends BaseService<JobseekerVerifyAccountFileDocument>{
  constructor(
    @InjectModel(JobseekerVerifyAccountFile.name)
    private jobseekerVerifyAccountFileModel: Model<JobseekerVerifyAccountFileDocument>,
  ) {
    super(jobseekerVerifyAccountFileModel);
  }
}
