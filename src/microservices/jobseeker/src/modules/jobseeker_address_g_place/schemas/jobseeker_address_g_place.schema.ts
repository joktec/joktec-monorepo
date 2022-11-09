import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerAddressGPlaceDocument = JobseekerAddressGPlace  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_address_g_place' })
export class JobseekerAddressGPlace {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  country: string;
  
  @Prop()
  formattedAddress: string;

  @Prop()
  placeId: string;

  @Prop()
  administrativeAreaLevel1: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  jobseekerId: string;

  @Prop()
  countryShortCode: string;

}

export const JobseekerAddressGPlaceSchema = SchemaFactory.createForClass(JobseekerAddressGPlace);
