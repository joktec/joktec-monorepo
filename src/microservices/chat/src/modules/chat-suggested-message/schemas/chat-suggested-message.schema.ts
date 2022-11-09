import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatSuggestedMessageDocument = ChatSuggestedMessage  & CustomMongooseDocument;

@Schema({ collection: 'chat_suggested_message' })
export class ChatSuggestedMessage {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  message: string;
  @Prop()
  sort: number;
  @Prop()
  isActive: number;
  @Prop()
  suggestedTo: string;
  @Prop()
  createdBy: string;
  @Prop()
  updatedBy: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  messageEn: string;
}

export const ChatSuggestedMessageSchema =
  SchemaFactory.createForClass(ChatSuggestedMessage);
