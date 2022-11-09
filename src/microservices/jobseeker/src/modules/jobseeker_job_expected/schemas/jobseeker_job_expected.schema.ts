import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerJobExpectedDocument = JobseekerJobExpected  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_job_expected' })
export class JobseekerJobExpected {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  title: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  aiStatusCode: number;

  @Prop()
  aiUpdatedAt: string;

  @Prop()
  skillsVectorEmbedding: string;

  @Prop()
  vectorEmbedding: string;

  @Prop()
  updatedAt: Date;
}

export const JobseekerJobExpectedSchema = SchemaFactory.createForClass(JobseekerJobExpected);
