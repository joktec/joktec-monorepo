import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerJobReferralDocument = JobseekerJobReferral  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_job_referral' })
export class JobseekerJobReferral {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  referralId: string;

  @Prop()
  jobId: string;

  @Prop()
  jobseekerId: string; 

  @Prop()
  createdAt: Date; 
}

export const JobseekerJobReferralSchema = SchemaFactory.createForClass(JobseekerJobReferral);
