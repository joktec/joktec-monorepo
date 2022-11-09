import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobGroupJobsDocument = JobGroupJobs & CustomMongooseDocument;

@Schema({ collection: 'jobgroup_jobs' })
export class JobGroupJobs {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jobgroupId: number;

  @Prop()
  jobId: string;
}

export const JobGroupJobsSchema = SchemaFactory.createForClass(JobGroupJobs);
