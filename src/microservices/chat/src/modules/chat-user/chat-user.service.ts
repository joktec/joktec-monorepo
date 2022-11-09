import { Model } from 'mongoose';
import { ChatUser, ChatUserDocument } from './schemas/chat-user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@jobhopin/core';

@Injectable()
export class ChatUserService extends BaseService<ChatUserDocument> {
  constructor(
    @InjectModel(ChatUser.name) private chatUserModel: Model<ChatUserDocument>,
  ) {
    super(chatUserModel);
  }
}
