import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerDocument = Jobseeker & CustomMongooseDocument;

@Schema({ collection: 'jobseeker' })
export class Jobseeker {
  @Prop({ default: uuid() })
  _id: string;

  @Prop({ type: String, length: 255 })
  name: string;

  @Prop({ type: String, length: 255 })
  username: string;

  @Prop({ type: Number })
  step: number;

  @Prop({ type: Number })
  step0: number;

  @Prop({ type: Number })
  step1: number;

  @Prop({ type: Number })
  step2: number;

  @Prop({ type: Number })
  step3: number;

  @Prop({ type: Number })
  step4: number;

  @Prop({ type: Number })
  step5: number;

  @Prop({ type: Number })
  step6: number;

  @Prop({ type: Number })
  step7: number;

  @Prop({ type: String })
  industry: string;

  @Prop({ type: String })
  skill: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: Number })
  platform: number;

  @Prop({ type: String })
  publicId: string;

  @Prop()
  personalUrl: string;

  @Prop()
  createBy: string;

  @Prop()
  createDate: Date;

  @Prop()
  cvPrimary: string;

  @Prop()
  lastUpdate: Date;

  @Prop()
  updateBy: string;

  @Prop()
  salaryExpect: number;

  @Prop()
  salaryExpectMax: number;

  @Prop()
  salaryExpectCurrency: string;

  @Prop()
  isSeeking: number;

  @Prop()
  jobTitleSeeking: string;

  @Prop()
  levelId: string;

  @Prop()
  salaryCurrency: string;

  @Prop()
  createByType: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  isAutoCreated: number;

  @Prop()
  personalWebsite: string;

  @Prop()
  professionalWebsite: string;

  @Prop()
  jsDefaultProfile: number;

  @Prop()
  salaryCurrent: number;

  @Prop()
  salaryCurrentMax: number;

  @Prop()
  salaryCurrentCurrency: string;

  @Prop()
  careerObjective: string;

  @Prop()
  coverImage: string;

  @Prop()
  mailchimpSyncAt: Date;

  @Prop()
  activecampaignSyncAt: Date;

  @Prop()
  activecampaignContactId: string;

  @Prop()
  remindProfileNotificationCount: number;

  @Prop()
  lastRemindProfileNotification: string;

  @Prop()
  verifyAccountCount: number;

  @Prop()
  lastVerifyAccountDate: Date;

  @Prop()
  jobTitle: string;

  @Prop()
  startDate: string;

  @Prop()
  vneId: string;

  @Prop()
  lookingForJobStatus: string;

  @Prop()
  defaultCvTemplate: string;

  @Prop()
  usedQuizUpdateProfileReward: number;

  @Prop()
  socialConnected: string;

  @Prop()
  defaultTemplate: string;

  @Prop()
  sqlId: string;
}

export const JobseekerSchema = SchemaFactory.createForClass(Jobseeker);
