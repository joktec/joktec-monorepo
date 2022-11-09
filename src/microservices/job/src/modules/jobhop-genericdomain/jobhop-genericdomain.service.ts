import {
  JobhopGenericDomain,
  JobhopGenericDomainDocument,
} from './schemas/jobhop-genericdomain.schema';
import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobhopGenericDomainService extends BaseService<JobhopGenericDomainDocument> {
  constructor(
    @InjectModel(JobhopGenericDomain.name)
    private readonly mainModel: Model<JobhopGenericDomainDocument>,
  ) {
    super(mainModel);
  }
}
