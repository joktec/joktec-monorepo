import { Model } from 'mongoose';
import {
  ChatMessage,
  ChatMessageDocument,
} from './schemas/chat-message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatMessageService extends BaseService<ChatMessageDocument> {
  constructor(
    @InjectModel(ChatMessage.name)
    private chatMessageModel: Model<ChatMessageDocument>,
  ) {
    super(chatMessageModel);
  }
}
