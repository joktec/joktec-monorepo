import { Model } from 'mongoose';
import { CvLink, CvLinkDocument } from './schemas/cv-link.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvLinkService extends BaseService<CvLinkDocument> {
  constructor(
    @InjectModel(CvLink.name)
    private cvModel: Model<CvLinkDocument>,
  ) {
    super(cvModel);
  }
}
