import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerEducationDocument = JobseekerEducation  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_education' })
export class JobseekerEducation {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  college: string;

  @Prop()
  deleted: number;
  
  @Prop()
  detail: string;

  @Prop()
  major: string;

  @Prop()
  username: string;

  @Prop()
  GPA: number;
  
  @Prop()
  cityId: string;

  @Prop()
  createBy: string;
  
  @Prop()
  createDate: Date;

  @Prop()
  degreeId: string;
  
  @Prop()
  endDate: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  startDate: Date;

  @Prop()
  updateBy: string;

  @Prop()
  stillStudying: number;

  @Prop()
  gpaExtra: string;

  @Prop()
  jobseekerId: string;
}

export const JobseekerEducationSchema = SchemaFactory.createForClass(JobseekerEducation);
