import {
  JobFavorite,
  JobFavoriteDocument,
} from './schemas/job-favorite.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobFavoriteService extends BaseService<JobFavoriteDocument> {
  constructor(
    @InjectModel(JobFavorite.name)
    private readonly mainModel: Model<JobFavoriteDocument>,
  ) {
    super(mainModel);
  }
}
