import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerFollowedOrganizationsDocument = JobseekerFollowedOrganizations  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_followed_organizations' })
export class JobseekerFollowedOrganizations {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  following: number;

  @Prop()
  jobseekerId: string;

  @Prop()
  organizationId: string;

  @Prop()
  emailSubscribed: number;

  @Prop()
  numberOfFollowTime: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const JobseekerFollowedOrganizationsSchema = SchemaFactory.createForClass(JobseekerFollowedOrganizations);
