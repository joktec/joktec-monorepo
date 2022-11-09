import {
  JobhopBlacklistDomain,
  JobhopBlacklistDomainDocument,
} from './schemas/jobhop-blacklistdomain.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopBlacklistDomainService extends BaseService<JobhopBlacklistDomainDocument> {
  constructor(
    @InjectModel(JobhopBlacklistDomain.name)
    private readonly mainModel: Model<JobhopBlacklistDomainDocument>,
  ) {
    super(mainModel);
  }
}
