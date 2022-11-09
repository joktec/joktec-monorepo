import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerCvEmailSegmentDocument = JobseekerCvEmailSegment  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_cv_email_segment' })
export class JobseekerCvEmailSegment {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  email: string;

  @Prop()
  cvId: string;

  @Prop()
  fullName: string;

  @Prop()
  accountActivated: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const JobseekerCvEmailSegmentSchema = SchemaFactory.createForClass(JobseekerCvEmailSegment);
