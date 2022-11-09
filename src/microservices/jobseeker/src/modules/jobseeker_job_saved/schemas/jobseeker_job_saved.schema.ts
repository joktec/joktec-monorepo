import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerJobSavedDocument = JobseekerJobSaved  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_job_saved' })
export class JobseekerJobSaved {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  jobId: string;

  @Prop()
  lastUpdate: Date;
}

export const JobseekerJobSavedSchema = SchemaFactory.createForClass(JobseekerJobSaved);
