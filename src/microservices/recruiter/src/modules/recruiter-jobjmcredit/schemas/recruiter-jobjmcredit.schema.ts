import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterJobjmcreditDocument = RecruiterJobjmcredit &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_jobjmcredit' })
export class RecruiterJobjmcredit {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  creditBurned: number;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  jobId: string;

  @Prop()
  planId: number;
}

export const RecruiterJobjmcreditSchema =
  SchemaFactory.createForClass(RecruiterJobjmcredit);
