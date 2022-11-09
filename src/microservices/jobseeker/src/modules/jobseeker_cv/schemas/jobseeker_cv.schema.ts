import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerCvDocument = JobseekerCv  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_cv' })
export class JobseekerCv {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  avatar: string;   
  
  @Prop()
  deleted: number;

  @Prop()
  email: string;    
  
  @Prop()
  fullname: string;

  @Prop()
  link: string;      
  
  @Prop()
  phone: string;

  @Prop()
  username: string;

  @Prop()
  source: string;

  @Prop()
  tags: string;
  
  // @Prop()
  // jobseekerCvId: string;

  @Prop()
  contentType: string;

  @Prop()
  fileSize: number;

  @Prop()
  lastUpdate: Date;
  
  @Prop()
  nameFile: string;

  @Prop()
  updateBy: string;

}

export const JobseekerCvSchema = SchemaFactory.createForClass(JobseekerCv);
