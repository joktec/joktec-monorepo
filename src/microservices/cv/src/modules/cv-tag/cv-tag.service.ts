import { Model } from 'mongoose';
import { CvTag, CvTagDocument } from './schemas/cv-tag.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvTagService extends BaseService<CvTagDocument> {
  constructor(
    @InjectModel(CvTag.name)
    private cvModel: Model<CvTagDocument>,
  ) {
    super(cvModel);
  }
}
