import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { UniversityDocument } from './schemas/university.schema';
import { NAME } from './university.constants';

export class UniversityService extends BaseService<UniversityDocument> {
  constructor(
    @InjectModel(NAME) private universityModel: Model<UniversityDocument>,
  ) {
    super(universityModel);
  }
}
