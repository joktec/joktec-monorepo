import { Model } from 'mongoose';
import {
  CvTemplates,
  CvTemplatesDocument,
} from './schemas/cv-templates.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvTemplatesService extends BaseService<CvTemplatesDocument> {
  constructor(
    @InjectModel(CvTemplates.name)
    private cvModel: Model<CvTemplatesDocument>,
  ) {
    super(cvModel);
  }
}
