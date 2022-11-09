import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobTemplateDocument = JobTemplate  & CustomMongooseDocument;

@Schema({ collection: 'job_template' })
export class JobTemplate {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  benefitEn: string;

  @Prop()
  benefitVi: string;

  @Prop()
  descriptionEn: string;

  @Prop()
  descriptionVi: string;

  @Prop()
  industryEn: string;

  @Prop()
  industryVi: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  requirementEn: string;

  @Prop()
  requirementVi: string;

  @Prop()
  title: string;
}

export const JobTemplateSchema = SchemaFactory.createForClass(JobTemplate);
