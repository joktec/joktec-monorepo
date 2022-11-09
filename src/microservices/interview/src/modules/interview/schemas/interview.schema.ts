import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type InterviewDocument = Interview & CustomMongooseDocument;

@Schema({ collection: 'interview' })
export class Interview {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  interviewId: string;
  @Prop()
  candidateId: string;
  @Prop()
  createBy: string;
  @Prop()
  createDate: Date;
  @Prop()
  interviewDate: Date;
  @Prop()
  interviewEndTime: Date;
  @Prop()
  interviewStartTime: Date;
  @Prop()
  intervieweeEmail: string;
  @Prop()
  intervieweeFullName: string;
  @Prop()
  intervieweeId: string;
  @Prop()
  lastUpdate: Date;
  @Prop()
  location: string;
  @Prop()
  name: string;
  @Prop()
  notes: string;
  @Prop()
  recruiterId: string;
  @Prop()
  updateBy: string;
  @Prop()
  interviewer: string;
  @Prop()
  gCalendarEventId: string;
  @Prop()
  canceled: number;
  @Prop()
  canceledAt: Date;
  @Prop()
  approved: number;
  @Prop()
  approvedBy: string;
  @Prop()
  approvedAt: Date;
  @Prop()
  jobId: string;
  @Prop()
  isRescheduled: number;
  @Prop()
  isSuccess: number;
  @Prop()
  status: number;
  @Prop()
  platform: number;
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
