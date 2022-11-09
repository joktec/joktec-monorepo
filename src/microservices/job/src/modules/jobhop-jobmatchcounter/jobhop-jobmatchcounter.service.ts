import {
  JobhopJobMatchCounter,
  JobhopJobMatchCounterDocument,
} from './schemas/jobhop-jobmatchcounter.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopJobMatchCounterService extends BaseService<JobhopJobMatchCounterDocument> {
  constructor(
    @InjectModel(JobhopJobMatchCounter.name)
    private readonly mainModel: Model<JobhopJobMatchCounterDocument>,
  ) {
    super(mainModel);
  }
}
