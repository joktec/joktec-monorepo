import { Model } from 'mongoose';
import {
  ChatConversation,
  ChatConversationDocument,
} from './schemas/chat-conversation.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatConversationService extends BaseService<ChatConversationDocument> {
  constructor(
    @InjectModel(ChatConversation.name)
    private chatModel: Model<ChatConversationDocument>,
  ) {
    super(chatModel);
  }
}
