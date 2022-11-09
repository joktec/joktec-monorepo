import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerCityDocument = JobseekerCity  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_city' })
export class JobseekerCity {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  cityId: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;
}

export const JobseekerCitySchema = SchemaFactory.createForClass(JobseekerCity);
