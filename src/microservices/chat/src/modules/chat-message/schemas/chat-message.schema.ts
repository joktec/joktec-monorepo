import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatMessageDocument = ChatMessage  & CustomMongooseDocument;

@Schema({ collection: 'chat_message' })
export class ChatMessage {
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
  index: number;
  @Prop()
  body: string;
  @Prop()
  attributes: string;
  @Prop()
  from: string;
  @Prop()
  lastUpdatedBy: string;
  @Prop()
  wasEdited: number;
  @Prop()
  type: string;
  @Prop()
  conversationId: number;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
