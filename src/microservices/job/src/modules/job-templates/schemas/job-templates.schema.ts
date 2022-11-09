import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobTemplatesDocument = JobTemplates  & CustomMongooseDocument;

@Schema({ collection: 'job_templates' })
export class JobTemplates {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  requirement: string;

  @Prop()
  isActive: number;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  levelId: string;

  @Prop()
  industryId: number;

  @Prop()
  language: string;
}

export const JobTemplatesSchema = SchemaFactory.createForClass(JobTemplates);
