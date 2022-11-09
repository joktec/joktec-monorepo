import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerEntityViewDocument = JobseekerEntityView  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_entity_view' })
export class JobseekerEntityView {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  keyword: string;

  @Prop()
  title: string;
  
  @Prop()
  image: string;

  @Prop()
  confidential: number;
  
  @Prop()
  entityType: string;

  @Prop()
  entityId: string;    
  
  @Prop()
  publicId: string;

  @Prop()
  subTitle: string;  
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
  
  @Prop()
  jobseekerId: string;

  @Prop()
  customUrlCompany: string;
}

export const JobseekerEntityViewSchema = SchemaFactory.createForClass(JobseekerEntityView);
