import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopFptoLadipageLogDocument = JobhopFptoLadipageLog &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_fptoladipagelog' })
export class JobhopFptoLadipageLog {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  timestamp: string;

  @Prop()
  companyName: string;

  @Prop()
  companySize: string;

  @Prop()
  headCount: string;

  @Prop()
  title: string;

  @Prop()
  source: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  suggestedPackage: string;

  @Prop()
  success: number;

  @Prop()
  reason: string;
}

export const JobhopFptoLadipageLogSchema = SchemaFactory.createForClass(
  JobhopFptoLadipageLog,
);
