import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerCareerInterestCardDocument = JobseekerCareerInterestCard  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_career_interest_card' })
export class JobseekerCareerInterestCard {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  username: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  jobTitle: string;

  @Prop()
  locationId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: number;

  @Prop()
  jobExpectId: string;

}

export const JobseekerCareerInterestCardSchema = SchemaFactory.createForClass(JobseekerCareerInterestCard);
