import {
  JobhopUserJobSentrecc,
  JobhopUserJobSentreccDocument,
} from './schemas/jobhop-userjobsentrecc.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopUserJobSentreccService extends BaseService<JobhopUserJobSentreccDocument> {
  constructor(
    @InjectModel(JobhopUserJobSentrecc.name)
    private readonly mainModel: Model<JobhopUserJobSentreccDocument>,
  ) {
    super(mainModel);
  }
}
