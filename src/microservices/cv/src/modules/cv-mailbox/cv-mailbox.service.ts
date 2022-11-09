import { Model } from 'mongoose';
import { CvMailBox, CvMailBoxDocument } from './schemas/cv-mailbox.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class CvMailBoxService extends BaseService<CvMailBoxDocument> {
  constructor(
    @InjectModel(CvMailBox.name)
    private cvModel: Model<CvMailBoxDocument>,
  ) {
    super(cvModel);
  }
}
