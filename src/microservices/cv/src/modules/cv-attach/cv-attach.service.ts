import { Model } from 'mongoose';
import { CvAttach, CvAttachDocument } from './schemas/cv-attach.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvAttachService extends BaseService<CvAttachDocument> {
  constructor(
    @InjectModel(CvAttach.name)
    private cvModel: Model<CvAttachDocument>,
  ) {
    super(cvModel);
  }
}
