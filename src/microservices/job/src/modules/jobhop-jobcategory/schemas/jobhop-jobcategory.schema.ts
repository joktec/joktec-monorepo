import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopJobCategoryDocument = JobhopJobCategory &
  CustomMongooseDocument;

@Schema({ collection: 'jobhop_jobcategory' })
export class JobhopJobCategory {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  functionId: number;

  @Prop()
  jobId: string;
}

export const JobhopJobCategorySchema =
  SchemaFactory.createForClass(JobhopJobCategory);
