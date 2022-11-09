import { Model } from 'mongoose';
import { CvIndustry, CvIndustryDocument } from './schemas/cv-industry.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvIndustryService extends BaseService<CvIndustryDocument> {
  constructor(
    @InjectModel(CvIndustry.name)
    private cvModel: Model<CvIndustryDocument>,
  ) {
    super(cvModel);
  }
}
