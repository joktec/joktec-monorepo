import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobGroupBurntCreditsDocument = JobGroupBurntCredits &
  CustomMongooseDocument;

@Schema({ collection: 'jobgroup_burnt_credits' })
export class JobGroupBurntCredits {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  jobId: string;

  @Prop()
  cvId: string;

  @Prop()
  email: string;
}

export const JobGroupBurntCreditsSchema =
  SchemaFactory.createForClass(JobGroupBurntCredits);
