import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterDocument = Recruiter & CustomMongooseDocument;

@Schema({ collection: 'recruiter' })
export class Recruiter {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  recruiterId: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  description: string;

  @Prop()
  disabled: number;

  @Prop()
  email: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  locked: number;

  @Prop()
  logo: string;

  @Prop()
  name: string;

  @Prop()
  organizationId: string;

  @Prop()
  title: string;

  @Prop()
  updateBy: string;

  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  deleted: number;

  @Prop()
  introducedJobmatched: number;

  @Prop()
  mailchimpSyncAt: Date;

  @Prop()
  activecampaignSyncAt: Date;

  @Prop()
  activecampaignContactId: string;

  @Prop()
  platform: number;

  @Prop()
  hsContactId: string;
}

export const RecruiterSchema = SchemaFactory.createForClass(Recruiter);
