import {
  JobhopUserAttemptLogin,
  JobhopUserAttemptLoginDocument,
} from './schemas/jobhop-userattemptlogin.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopUserAttemptLoginService extends BaseService<JobhopUserAttemptLoginDocument> {
  constructor(
    @InjectModel(JobhopUserAttemptLogin.name)
    private readonly mainModel: Model<JobhopUserAttemptLoginDocument>,
  ) {
    super(mainModel);
  }
}
