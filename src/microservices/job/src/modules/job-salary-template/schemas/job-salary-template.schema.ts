import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobSalaryTemplateDocument = JobSalaryTemplate  & CustomMongooseDocument;

@Schema({ collection: 'job_salary_template' })
export class JobSalaryTemplate {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  avgSalary: string;

  @Prop()
  experienceYear: string;

  @Prop()
  industry: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  maxSalary: string;

  @Prop()
  minSalary: string;

  @Prop()
  region: string;

  @Prop()
  title: string;
}

export const JobSalaryTemplateSchema =
  SchemaFactory.createForClass(JobSalaryTemplate);
