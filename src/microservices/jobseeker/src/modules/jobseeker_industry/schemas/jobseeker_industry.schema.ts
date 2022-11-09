import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerIndustryDocument = JobseekerIndustry  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_industry' })
export class JobseekerIndustry {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  username: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  industryId: string;

  @Prop()
  jobseekerId: string;
}

export const JobseekerIndustrySchema = SchemaFactory.createForClass(JobseekerIndustry);
