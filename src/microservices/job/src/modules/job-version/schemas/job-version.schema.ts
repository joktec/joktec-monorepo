import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobVersionDocument = JobVersion  & CustomMongooseDocument;

@Schema({ collection: 'job_version' })
export class JobVersion {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  jobVersionId: string;

  @Prop()
  address: string;

  @Prop()
  benefit: string;

  @Prop()
  benefitOther: string;

  @Prop()
  cityId: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  deleted: number;

  @Prop()
  description: string;

  @Prop()
  descriptionText: string;

  @Prop()
  districtId: string;

  @Prop()
  image: string;

  @Prop()
  industryId: string;

  @Prop()
  jobId: string;

  @Prop()
  jobTypeId: string;

  @Prop()
  jobWorkingTime: string;

  @Prop()
  languageId: string;

  @Prop()
  levelId: string;

  @Prop()
  location: string;

  @Prop()
  position: string;

  @Prop()
  quantity: number;

  @Prop()
  requestDate: Date;

  @Prop()
  requirement: string;

  @Prop()
  salaryCurrency: string;

  @Prop()
  salaryMax: number;

  @Prop()
  salaryMin: number;

  @Prop()
  salaryOption: number;

  @Prop()
  status: string;

  @Prop()
  tags: string;

  @Prop()
  versionNumber: number;
}

export const JobVersionSchema = SchemaFactory.createForClass(JobVersion);
