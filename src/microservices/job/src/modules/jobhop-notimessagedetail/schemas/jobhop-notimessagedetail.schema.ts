import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopNotiMessageDetailDocument = JobhopNotiMessageDetail &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_notimessagedetail' })
export class JobhopNotiMessageDetail {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  subject: string;

  @Prop()
  subjectEn: string;

  @Prop()
  body: string;

  @Prop()
  bodyEn: string;

  @Prop()
  msgType: string;

  @Prop()
  iconType: number;

  @Prop()
  extraData: string;
}

export const JobhopNotiMessageDetailSchema = SchemaFactory.createForClass(
  JobhopNotiMessageDetail,
);
