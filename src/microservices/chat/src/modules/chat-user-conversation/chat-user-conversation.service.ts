import { Model } from 'mongoose';
import {
  ChatUserConversation,
  ChatUserConversationDocument,
} from './schemas/chat-user-conversation.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatUserConversationService extends BaseService<ChatUserConversationDocument> {
  constructor(
    @InjectModel(ChatUserConversation.name)
    private chatUserConversationModel: Model<ChatUserConversationDocument>,
  ) {
    super(chatUserConversationModel);
  }
}
