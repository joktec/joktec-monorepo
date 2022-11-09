import { Model } from 'mongoose';
import {
  ChatMediaMessage,
  ChatMediaMessageDocument,
} from './schemas/chat-media-message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatMediaMessageService extends BaseService<ChatMediaMessageDocument> {
  constructor(
    @InjectModel(ChatMediaMessage.name)
    private chatMediaMessageModel: Model<ChatMediaMessageDocument>,
  ) {
    super(chatMediaMessageModel);
  }
}
