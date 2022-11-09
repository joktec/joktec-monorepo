import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerReferenceDocument = JobseekerReference  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_reference' })
export class JobseekerReference {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  title: string;
  
  @Prop()
  email: string;

  @Prop()
  username: string;
  
  @Prop()
  phoneNumber: string;

  @Prop()
  companyName: string;

  @Prop()
  updateBy: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  lastUpdate: Date;
}

export const JobseekerReferenceSchema = SchemaFactory.createForClass(JobseekerReference);
