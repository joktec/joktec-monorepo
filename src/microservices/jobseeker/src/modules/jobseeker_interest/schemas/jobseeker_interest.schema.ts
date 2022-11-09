import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerInterestDocument = JobseekerInterest  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_interest' })
export class JobseekerInterest {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  interest: string;

  @Prop()
  updateBy: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  jobseekerId: string;
}

export const JobseekerInterestSchema = SchemaFactory.createForClass(JobseekerInterest);
