import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerJobAlertDocument = JobseekerJobAlert  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_job_alert' })
export class JobseekerJobAlert {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  key: string;

  @Prop()
  frequency: string;

  @Prop()
  email: string;

  @Prop()
  platform: number;

  @Prop()
  jobseekerId: string;

  @Prop()
  jobTitle: string;

  @Prop()
  locationIds: string;

  @Prop()
  isActive: Number;

  @Prop()
  alertVia: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isGuest: number;
}

export const JobseekerJobAlertSchema = SchemaFactory.createForClass(JobseekerJobAlert);
