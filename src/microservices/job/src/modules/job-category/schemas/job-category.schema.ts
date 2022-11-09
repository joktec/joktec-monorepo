import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobCategoryDocument = JobCategory  & CustomMongooseDocument;

@Schema({ collection: 'job_category' })
export class JobCategory {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  nameEng: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  priority: number;

  @Prop()
  code: string;

  @Prop()
  active: number;
}

export const JobCategorySchema = SchemaFactory.createForClass(JobCategory);
