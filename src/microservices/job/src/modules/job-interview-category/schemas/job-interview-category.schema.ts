import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobInterviewCategoryDocument = JobInterviewCategory  & CustomMongooseDocument;

@Schema({ collection: 'job_interview_category' })
export class JobInterviewCategory {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  name: string;
}

export const JobInterviewCategorySchema =
  SchemaFactory.createForClass(JobInterviewCategory);
