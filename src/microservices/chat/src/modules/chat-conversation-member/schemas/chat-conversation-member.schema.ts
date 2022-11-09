import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatConversationMemberDocument = ChatConversationMember  & CustomMongooseDocument;

@Schema({ collection: 'chat_conversation_member' })
export class ChatConversationMember {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  accountSid: string;
  @Prop()
  instanceSid: string;
  @Prop()
  dateCreated: Date;
  @Prop()
  dateUpdated: Date;
  @Prop()
  channelSid: string;
  @Prop()
  identity: string;
  @Prop()
  roleSid: string;
  @Prop()
  reason: string;
  @Prop()
  attributes: string;
  @Prop()
  dateRemoved: Date;
}

export const ChatConversationMemberSchema = SchemaFactory.createForClass(
  ChatConversationMember,
);
