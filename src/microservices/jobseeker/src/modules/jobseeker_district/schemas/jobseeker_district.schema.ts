import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerDistrictDocument = JobseekerDistrict  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_district' })
export class JobseekerDistrict {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  username: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  districtId: string;
}

export const JobseekerDistrictSchema = SchemaFactory.createForClass(JobseekerDistrict);
