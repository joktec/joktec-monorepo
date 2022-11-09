import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type NotiMessageDocument = NotiMessage & CustomMongooseDocument;

@Schema({ collection: 'noti_message' })
export class NotiMessage {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  isRead: number;

  @Prop()
  link: string;

  @Prop()
  organizationId: string;

  @Prop()
  userId: string;

  @Prop()
  msgDetailId: number;
}

export const NotiMessageSchema = SchemaFactory.createForClass(NotiMessage);
