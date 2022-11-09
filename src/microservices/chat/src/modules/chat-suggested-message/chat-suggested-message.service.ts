import { Model } from 'mongoose';
import {
  ChatSuggestedMessage,
  ChatSuggestedMessageDocument,
} from './schemas/chat-suggested-message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatSuggestedMessageService extends BaseService<ChatSuggestedMessageDocument> {
  constructor(
    @InjectModel(ChatSuggestedMessage.name)
    private chatSuggestedMessageModel: Model<ChatSuggestedMessageDocument>,
  ) {
    super(chatSuggestedMessageModel);
  }
}
