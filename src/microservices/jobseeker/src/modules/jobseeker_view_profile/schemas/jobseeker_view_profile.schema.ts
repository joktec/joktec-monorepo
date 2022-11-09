import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerViewProfileDocument = JobseekerViewProfile  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_view_profile' })
export class JobseekerViewProfile {
  @Prop({ default: uuid() })
  _id: string;

  // @Prop()
  // viewId: string;

  @Prop()
  viewerId: string;

  @Prop()
  viewerUsername: string;

  @Prop()
  profileId: string;

  @Prop()
  profileUsername: string;

  @Prop()
  createdAt: Date;

  @Prop()
  viewAt: Date;
}

export const JobseekerViewProfileSchema = SchemaFactory.createForClass(JobseekerViewProfile);
