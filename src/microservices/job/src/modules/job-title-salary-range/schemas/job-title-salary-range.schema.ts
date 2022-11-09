import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobTitleSalaryRangeDocument = JobTitleSalaryRange  & CustomMongooseDocument;

@Schema({ collection: 'job_title_salary_range' })
export class JobTitleSalaryRange {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jobTitle: string;

  @Prop()
  salaryMin: number;

  @Prop()
  salaryMax: number;
}

export const JobTitleSalaryRangeSchema =
  SchemaFactory.createForClass(JobTitleSalaryRange);
