import {
  JobhopInternalUserEmail,
  JobhopInternalUserEmailDocument,
} from './schemas/jobhop-internaluseremail.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopInternalUserEmailService extends BaseService<JobhopInternalUserEmailDocument> {
  constructor(
    @InjectModel(JobhopInternalUserEmail.name)
    private readonly mainModel: Model<JobhopInternalUserEmailDocument>,
  ) {
    super(mainModel);
  }
}
