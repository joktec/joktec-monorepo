import {
  JobhopJobLocation,
  JobhopJobLocationDocument,
} from './schemas/jobhop-joblocation.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopJobLocationService extends BaseService<JobhopJobLocationDocument> {
  constructor(
    @InjectModel(JobhopJobLocation.name)
    private readonly mainModel: Model<JobhopJobLocationDocument>,
  ) {
    super(mainModel);
  }
}
