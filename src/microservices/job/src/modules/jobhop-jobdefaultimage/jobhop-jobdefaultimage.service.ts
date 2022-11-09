import {
  JobhopJobDefaultImage,
  JobhopJobDefaultImageDocument,
} from './schemas/jobhop-jobdefaultimage.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopJobDefaultImageService extends BaseService<JobhopJobDefaultImageDocument> {
  constructor(
    @InjectModel(JobhopJobDefaultImage.name)
    private readonly mainModel: Model<JobhopJobDefaultImageDocument>,
  ) {
    super(mainModel);
  }
}
