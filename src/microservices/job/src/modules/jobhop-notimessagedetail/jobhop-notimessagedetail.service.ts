import {
  JobhopNotiMessageDetail,
  JobhopNotiMessageDetailDocument,
} from './schemas/jobhop-notimessagedetail.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopNotiMessageDetailService extends BaseService<JobhopNotiMessageDetailDocument> {
  constructor(
    @InjectModel(JobhopNotiMessageDetail.name)
    private readonly mainModel: Model<JobhopNotiMessageDetailDocument>,
  ) {
    super(mainModel);
  }
}
