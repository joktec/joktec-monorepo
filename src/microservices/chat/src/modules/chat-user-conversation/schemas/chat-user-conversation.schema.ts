import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatUserConversationDocument = ChatUserConversation  & CustomMongooseDocument;

@Schema({ collection: 'chat_user_conversation' })
export class ChatUserConversation {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  accountSid: string;
  @Prop()
  channelSid: string;
  @Prop()
  serviceSid: string;
  @Prop()
  memberSid: string;
  @Prop()
  userSid: string;
  @Prop()
  userId: string;
  @Prop()
  status: string;
  @Prop()
  lastConsumedMessageIndex: number;
  @Prop()
  unreadMessagesCount: number;
  @Prop()
  updatedAt: Date;
  @Prop()
  activatedAt: Date;
  @Prop()
  createdAt: Date;
  @Prop()
  conversationId: number;
  @Prop()
  isJsUser: number;
  @Prop()
  unseen: number;
  @Prop()
  lastSentMessageIndex: number;
}

export const ChatUserConversationSchema =
  SchemaFactory.createForClass(ChatUserConversation);
