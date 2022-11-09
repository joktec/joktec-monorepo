import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatUserDocument = ChatUser  & CustomMongooseDocument;

@Schema({ collection: 'chat_user' })
export class ChatUser {
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
  identity: string;
  @Prop()
  friendlyName: string;
  @Prop()
  roleSid: string;
  @Prop()
  attributes: string;
  @Prop()
  isNotifiable: number;
  @Prop()
  isOnline: number;
  @Prop()
  lastOnlineDate: Date;
}

export const ChatUserSchema = SchemaFactory.createForClass(ChatUser);
