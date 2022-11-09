import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobInterviewCsInChargeDocument = JobInterviewCsInCharge  & CustomMongooseDocument;

@Schema({ collection: 'job_interview_CS_in_charge' })
export class JobInterviewCsInCharge {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jobinterviewId: number;

  @Prop()
  userId: number;
}

export const JobInterviewCsInChargeSchema = SchemaFactory.createForClass(
  JobInterviewCsInCharge,
);
