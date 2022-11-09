import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopJobAtsActivityDocument = JobhopJobAtsActivity &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_jobatsactivity' })
export class JobhopJobAtsActivity {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  message: string;

  @Prop()
  createdAt: Date;

  @Prop()
  candidateId: string;

  @Prop()
  doerId: string;

  @Prop()
  jobId: string;

  @Prop()
  organizationId: string;

  @Prop()
  activityType: string;

  @Prop()
  candidateType: string;

  @Prop()
  currentStatus: string;

  @Prop()
  planName: string;

  @Prop()
  previousStatus: string;

  @Prop()
  isPublic: number;
}

export const JobhopJobAtsActivitySchema =
  SchemaFactory.createForClass(JobhopJobAtsActivity);
