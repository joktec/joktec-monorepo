import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerVerifyAccount, JobseekerVerifyAccountDocument } from './schemas/jobseeker_verify_accounts.schema';

@Injectable()
export class JobseekerVerifyAccountService extends BaseService<JobseekerVerifyAccountDocument>{
  constructor(
    @InjectModel(JobseekerVerifyAccount.name)
    private jobseekerVerifyAccountModel: Model<JobseekerVerifyAccountDocument>,
  ) {
    super(jobseekerVerifyAccountModel);
  }
}
