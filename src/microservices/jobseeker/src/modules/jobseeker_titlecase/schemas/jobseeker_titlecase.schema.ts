import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerTitlecaseDocument = JobseekerTitlecase  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_titlecase' })
export class JobseekerTitlecase {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  title: string;
}

export const JobseekerTitlecaseSchema = SchemaFactory.createForClass(JobseekerTitlecase);
