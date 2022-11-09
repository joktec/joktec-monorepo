import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerLocationDocument = JobseekerLocation  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_location' })
export class JobseekerLocation {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdOn: Date;

  @Prop()
  userId: string;

  @Prop()
  locationId: number;

  @Prop()
  jobseekerId: string;
}

export const JobseekerLocationSchema = SchemaFactory.createForClass(JobseekerLocation);
