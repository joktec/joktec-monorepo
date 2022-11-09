import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerJobFunctionDocument = JobseekerJobFunction  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_job_function' })
export class JobseekerJobFunction {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createDate: Date;

  @Prop()
  jobFunction: string;

  @Prop()
  jobseekerId: string;
}

export const JobseekerJobFunctionSchema = SchemaFactory.createForClass(JobseekerJobFunction);
