import { Model } from 'mongoose';
import {
  ChatMediaFile,
  ChatMediaFileDocument,
} from './schemas/chat-media-file.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatMediaFileService extends BaseService<ChatMediaFileDocument> {
  constructor(
    @InjectModel(ChatMediaFile.name)
    private chatModel: Model<ChatMediaFileDocument>,
  ) {
    super(chatModel);
  }
}
