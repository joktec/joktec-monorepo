import {
  JobMatchPageVideolink,
  JobMatchPageVideolinkDocument,
} from './schemas/jobmatch-page-videolink.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobMatchPageVideolinkService extends BaseService<JobMatchPageVideolinkDocument> {
  constructor(
    @InjectModel(JobMatchPageVideolink.name)
    private readonly mainModel: Model<JobMatchPageVideolinkDocument>,
  ) {
    super(mainModel);
  }
}
