import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerJobTypeDocument = JobseekerJobType  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_job_type' })
export class JobseekerJobType {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  username: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  jobTypeId: string;

  @Prop()
  jobseekerId: string;
}

export const JobseekerJobTypeSchema = SchemaFactory.createForClass(JobseekerJobType);
