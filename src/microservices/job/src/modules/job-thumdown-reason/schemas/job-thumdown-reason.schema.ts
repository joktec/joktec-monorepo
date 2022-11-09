import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobThumdownReasonDocument = JobThumdownReason  & CustomMongooseDocument;

@Schema({ collection: 'job_thumdown_reason' })
export class JobThumdownReason {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  otherReason: string;

  @Prop()
  createdAt: Date;

  @Prop()
  jobId: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  thumbdownReasonsId: number;
}

export const JobThumdownReasonSchema =
  SchemaFactory.createForClass(JobThumdownReason);
