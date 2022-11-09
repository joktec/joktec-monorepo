import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatMediaMessageDocument = ChatMediaMessage  & CustomMongooseDocument;

@Schema({ collection: 'chat_media_message' })
export class ChatMediaMessage {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  sid: string;
  @Prop()
  accountSid: string;
  @Prop()
  serviceSid: string;
  @Prop()
  dateCreated: Date;
  @Prop()
  dateUpdated: Date;
  @Prop()
  channelSid: string;
  @Prop()
  messageSid: string;
  @Prop()
  author: string;
  @Prop()
  sise: number;
  @Prop()
  contentType: string;
  @Prop()
  fileName: string;
  @Prop()
  url: string;
}

export const ChatMediaMessageSchema =
  SchemaFactory.createForClass(ChatMediaMessage);
