import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatConversationDocument = ChatConversation  & CustomMongooseDocument;

@Schema({ collection: 'chat_conversation' })
export class ChatConversation {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  displayName: string;
  @Prop()
  channelSid: string;
  @Prop()
  jobId: string;
  @Prop()
  isActive: number;
  @Prop()
  lastMessageSid: string;
  @Prop()
  lastUpdatedTime: Date;
  @Prop()
  createdTime: Date;
  @Prop()
  jobseekerId: string;
  @Prop()
  isReady: number;
  @Prop()
  createdBy: string;
  @Prop()
  isClosed: number;
  @Prop()
  uniqueName: string;
  @Prop()
  updatedBy: string;
  @Prop()
  lastSentMessageIndex: number;
  @Prop()
  jhCandidateId: string;
  @Prop()
  recruiterUserId: string;
  @Prop()
  lastMessageIndex: number;
  @Prop()
  connectionId: string;
}

export const ChatConversationSchema =
  SchemaFactory.createForClass(ChatConversation);
