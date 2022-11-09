import { Model } from 'mongoose';
import { Cv, CvDocument } from './schemas/cv.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvService extends BaseService<CvDocument> {
  constructor(
    @InjectModel(Cv.name)
    private cvModel: Model<CvDocument>,
  ) {
    super(cvModel);
  }
}
