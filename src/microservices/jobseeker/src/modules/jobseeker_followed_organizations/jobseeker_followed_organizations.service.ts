import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobseekerFollowedOrganizations, JobseekerFollowedOrganizationsDocument } from './schemas/jobseeker_followed_organizations.schema';

@Injectable()
export class JobseekerFollowedOrganizationsService extends BaseService<JobseekerFollowedOrganizationsDocument>{
  constructor(
    @InjectModel(JobseekerFollowedOrganizations.name)
    private jobseekerFollowedOrganizationsModel: Model<JobseekerFollowedOrganizationsDocument>,
  ) {
    super(jobseekerFollowedOrganizationsModel);
  }
}
