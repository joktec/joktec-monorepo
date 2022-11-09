import { BaseService } from '@jobhopin/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotiMessage,
  NotiMessageDocument,
} from './schemas/noti-message.schema';

@Injectable()
export class NotiMessageService extends BaseService<NotiMessageDocument> {
  constructor(
    @InjectModel(NotiMessage.name)
    private notiMessageModel: Model<NotiMessageDocument>,
  ) {
    super(notiMessageModel);
  }
}
