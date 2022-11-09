import { Model } from 'mongoose';
import {
  ChatConversationMember,
  ChatConversationMemberDocument,
} from './schemas/chat-conversation-member.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatConversationMemberService extends BaseService<ChatConversationMemberDocument> {
  constructor(
    @InjectModel(ChatConversationMember.name)
    private chatModel: Model<ChatConversationMemberDocument>,
  ) {
    super(chatModel);
  }
}
