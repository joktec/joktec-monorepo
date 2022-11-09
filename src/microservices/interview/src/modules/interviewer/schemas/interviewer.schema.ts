import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewerDocument = Interviewer & CustomMongooseDocument;

@Schema({ collection: 'interviewer' })
export class Interviewer {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  interviewerId: string;
  @Prop()
  avatar: string;
  @Prop()
  createBy: string;
  @Prop()
  createDate: Date;
  @Prop()
  email: string;
  @Prop()
  fullName: string;
  @Prop()
  lastUpdate: Date;
  @Prop()
  updateBy: string;
  @Prop()
  username: string;
}

export const InterviewerSchema = SchemaFactory.createForClass(Interviewer);
