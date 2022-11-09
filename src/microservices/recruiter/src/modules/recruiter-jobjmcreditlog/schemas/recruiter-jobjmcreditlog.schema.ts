import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterJobjmcreditlogDocument = RecruiterJobjmcreditlog &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_jobjmcreditlog' })
export class RecruiterJobjmcreditlog {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  creditBurned: number;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  jobId: string;
}

export const RecruiterJobjmcreditlogSchema = SchemaFactory.createForClass(
  RecruiterJobjmcreditlog,
);
